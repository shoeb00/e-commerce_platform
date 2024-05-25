import { Request, Response } from "express";
import { database } from "../../database";
import {
    VAddProduct,
    VGetProduct,
    VUpdateProductDetails,
} from "../../store/validators/store.validator";
import { objectIdValidator } from "../../store/validators";
import { IProduct } from "../../store/interfaces/product.interface";
import { faker } from "@faker-js/faker";
import { EProductCategory } from "../../store/enums/productCategory.enum";

export const viewProducts = async (req: Request, res: Response) => {
    try {
        const input = req.query;
        const { error, value } = VGetProduct.validate(input);
        if (error) {
            console.log(error.message);
            return res.status(400).json({ message: error.message });
        }

        const { category, storeId, name, skip = 0, limit = 10 } = value;

        const filter: any = {};
        if (category) filter.category = category;
        if (storeId) filter.storeId = storeId;
        if (name) filter.name = new RegExp(name, "i");
        const products = await database.Product.find(filter)
            .skip(skip)
            .limit(limit)
            .lean()
            .exec();
        return res.status(200).json({ message: "Success", products });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const addProduct = async (req: Request, res: Response) => {
    try {
        const input = req.body;
        input.storeId = req.params.userId;
        const { error } = VAddProduct.validate(input);
        if (error) {
            console.log(error.message);
            return res.status(400).json({ message: error.message });
        }
        const result = await database.Product.create(input);
        res.status(201).json({
            message: "Product added successfully",
            result,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const updateProductDetails = async (req: Request, res: Response) => {
    try {
        const input = req.body;
        const { error } = VUpdateProductDetails.validate(input);
        if (error) {
            console.log(error.message);
            return res.status(400).json({ message: error.message });
        }
        const result = await database.Product.findOneAndUpdate(
            { storeId: req.params.userId, _id: input.id },
            { ...input }
        );
        res.status(201).json({
            message: "Product description updated successfully",
            result,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

const getRandomCategory = () => {
    const index = Math.floor(
        Math.random() * Object.keys(EProductCategory).length
    );
    const value = Object.values(EProductCategory)[index];

    return EProductCategory[value];
};

export const addRandomProducts = async (req: Request, res: Response) => {
    try {
        const numberOfProducts = Number(req.query.size) || 10;
        const storeId = req.query.storeId?.toString() || "";
        const { error } = objectIdValidator.validate(storeId);
        if (error) {
            console.log(error.message);
            return res.status(400).json({ message: "Invalid storeId" });
        }
        const store = await database.User.findById({ _id: storeId });
        if (!store) {
            return res.status(400).json({ message: "Store does not exists" });
        }
        const products: IProduct[] = [];
        for (let i = 0; i < numberOfProducts; i++) {
            const product = {
                name: faker.commerce.productName(),
                price: Math.floor(Math.random() * 100) * 10,
                category: getRandomCategory(),
                quantity: Math.floor(Math.random() * 50),
                storeId,
            };
            products.push(product);
        }
        const result = await database.Product.insertMany(products);
        res.status(201).json({
            message: "Product description updated successfully",
            result,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
