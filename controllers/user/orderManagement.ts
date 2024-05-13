import { Request, Response } from "express";
import database from "../../database";
import {
    VBuyOrder,
    VSearchProduct,
} from "../../store/validators/user.validator";
import { IProduct } from "../../store/interfaces/product.interface";
import { EOrderStatus } from "../../store/enums/orderStatus.enum";
import { categoryValidator, objectIdValidator } from "../../store/validators";

export const viewProducts = async (req: Request, res: Response) => {
    try {
        const skip = parseInt(req.params.skip) || 0;
        const limit = parseInt(req.params.limit) || 10;
        const category = req.params.category?.toUpperCase();
        const { error } = categoryValidator.validate(category);
        if (error) {
            console.log(error.message);
            return res.status(400).json({ message: "Invalid orderId" });
        }
        const products = await database.Product.find({
            category,
            storeId: req.body.user.storeId,
        })
            .skip(skip)
            .limit(limit)
            .lean();
        return res.status(200).json({ message: "Success", products });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const placeOrder = async (req: Request, res: Response) => {
    try {
        const products = req.body;
        const productIds: string[] = [];
        products.foreach((product) => {
            const { value, error } = VBuyOrder.validate({ product });
            if (error) {
                console.log(error.message);
                return res.status(400).json({ message: error.message });
            }
            productIds.push(value.productId);
        });
        const productDetails: IProduct = await database.Product.find({
            id: { $in: productIds },
        })
            .sort({ id: 1 })
            .lean();
        products.sort((a, b) => a.productId - b.productId);
        const insufficientStock: IProduct[] = [];
        const cart: IProduct[] = [];
        let totalPrice = 0;
        for (let i = 0; i < products.length; i++) {
            const requestedQuantity = products[i].quantity;
            const availableQuantity = productDetails[i].quantity;
            if (availableQuantity < requestedQuantity) {
                insufficientStock.push(products[i]);
            } else {
                const updatedQuantity = availableQuantity - requestedQuantity;
                productDetails[i].quantity = updatedQuantity;
                totalPrice += productDetails[i].price * requestedQuantity;
                cart.push(productDetails[i]);
            }
        }
        const promises: Promise<object>[] = [];
        for (const product of cart) {
            const promise = database.Product.updateOne(
                {
                    id: product.id,
                },
                {
                    quantity: product.quantity,
                }
            ).lean();
            promises.push(promise);
        }
        const result = await Promise.all(promises);
        const order = await database.Order.create(
            {
                totalPrice,
                products,
                status: EOrderStatus.ORDER_CONFIRMED,
                userId: req.body.user.id,
            },
            { lean: true }
        );
        return res.status(200).json({
            message: "Order place successfully",
            order,
            insufficientStock,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const cancelOrder = async (req: Request, res: Response) => {
    try {
        const orderId = req.params.orderId;
        const { error } = objectIdValidator.validate(orderId);
        if (error) {
            console.log(error.message);
            return res.status(400).json({ message: "Invalid orderId" });
        }
        const orderDetails = await database.Order.findById({
            id: orderId,
        }).lean();
        if (orderDetails?.status !== EOrderStatus.ORDER_CONFIRMED) {
            return res.status(200).json({
                message:
                    "This order cannot be cancelled, Please contact our customer support",
                orderDetails,
            });
        }
        const promises: Promise<object>[] = [];
        for (const product of orderDetails.products) {
            const promise = database.Product.updateOne(
                { id: product.productId },
                { $inc: { quantity: product.quantity } }
            ).lean();
            promises.push(promise);
        }
        const result = await Promise.all(promises);
        const order = await database.Order.updateOne(
            { id: orderId },
            { status: EOrderStatus.CANCELLED }
        ).lean();
        return res
            .status(200)
            .json({ message: "Order cancelled successfully", order });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const ordersHistory = async (req: Request, res: Response) => {
    try {
        const skip = parseInt(req.params.skip) || 0;
        const limit = parseInt(req.params.limit) || 10;
        const status = req.query.category?.toString().toUpperCase();
        const startDate = req.query.startDate?.toString() || "1970-01-01";
        const endDate =
            req.query.endDate?.toString() ||
            new Date().toISOString().slice(0, 10);
        const { error } = VSearchProduct.validate({
            status,
            startDate,
            endDate,
        });
        if (error) {
            console.log(error.message);
            return res.status(400).json({ message: error.message });
        }
        const orders = await database.Order.find({
            status,
            createdAt: { $gte: new Date(startDate), $le: new Date(endDate) },
        })
            .skip(skip)
            .limit(limit)
            .lean();
        return res.json({ message: "Success", orders });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};