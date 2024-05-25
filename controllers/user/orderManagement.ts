import { Request, Response } from "express";
import { database } from "../../database";
import {
    VBuyOrder,
    VSearchProduct,
} from "../../store/validators/user.validator";
import { IProduct } from "../../store/interfaces/product.interface";
import { EOrderStatus } from "../../store/enums/orderStatus.enum";
import { objectIdValidator } from "../../store/validators";
import { IOrderProduct } from "../../store/interfaces/orderProducts.interface";
import { VUpdateOrderStatus } from "../../store/validators/store.validator";

export const placeOrder = async (req: Request, res: Response) => {
    try {
        const products: IOrderProduct[] = req.body;
        const productIds: string[] = [];
        const storeId = req.params.storeId;
        if (!products.length) {
            return res.status(400).json({ message: "No product is added" });
        }
        for (const product of products) {
            const { value, error } = VBuyOrder.validate(product);
            if (error) {
                console.log(error.message);
                return res.status(400).json({ message: error.message });
            }
            productIds.push(value.productId);
        }
        productIds.sort();
        const productDetails: IProduct[] = await database.Product.find({
            _id: { $in: productIds },
            storeId,
        })
            .sort({ _id: 1 })
            .lean();
        const insufficientStock: IOrderProduct[] = [];
        const cart: IProduct[] = [];
        let totalPrice = 0;
        for (let i = 0, j = 0; i < products.length; i++, j++) {
            if (products[i].productId !== productIds[j]) {
                j++;
                continue;
            }
            const requestedQuantity = products[i].quantity;
            const availableQuantity = productDetails[j].quantity;
            if (availableQuantity < requestedQuantity) {
                insufficientStock.push(products[i]);
            } else {
                const stock = availableQuantity - requestedQuantity;
                productDetails[j].stock = stock;
                totalPrice += productDetails[j].price * requestedQuantity;
                cart.push(productDetails[j]);
            }
        }
        if (!cart.length) {
            return res.status(200).json({
                message: "Requested products are not in stock",
                insufficientStock,
            });
        }
        const promises: Promise<object>[] = [];
        for (const product of cart) {
            const promise = database.Product.updateOne(
                {
                    _id: product._id?.toString(),
                },
                {
                    quantity: product.stock,
                }
            );
            promises.push(promise);
        }
        const result = await Promise.all(promises);
        const order = await database.Order.create({
            totalPrice,
            products,
            status: EOrderStatus.ORDER_CONFIRMED,
            userId: req.params.userId,
            storeId,
        });
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
        const orderId = req.query.orderId;
        const { error } = objectIdValidator.validate(orderId);
        if (error) {
            console.log(error.message);
            return res.status(400).json({ message: "Invalid orderId" });
        }
        const orderDetails = await database.Order.findById({
            _id: orderId,
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
                { _id: product.productId },
                { $inc: { quantity: product.quantity } }
            );
            promises.push(promise);
        }
        const result = await Promise.all(promises);
        const order = await database.Order.updateOne(
            { _id: orderId },
            { status: EOrderStatus.CANCELLED }
        );
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
        const filter: any = {};
        if (status) filter.status = status;
        if (startDate || endDate) {
            filter.createdAt = {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            };
        }
        const orders = await database.Order.find(filter)
            .skip(skip)
            .limit(limit)
            .lean();
        return res.json({ message: "Success", orders });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
    try {
        const input = req.body;
        const { error } = VUpdateOrderStatus.validate(input);
        if (error) {
            console.log(error.message);
            return res.status(400).json({ message: error.message });
        }
        const result = await database.Order.findOneAndUpdate(
            { storeId: req.params.userId, _id: input.id },
            { status: input.status.toUpperCase() },
            { new: true }
        ).lean();
        if (!result) {
            return res
                .status(400)
                .json({ message: "No product found with this id" });
        }
        res.status(201).json({
            message: "Product description updated successfully",
            result,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
