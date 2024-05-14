import { Request, Response } from "express";
import { database } from "../../database";
import {
    VAddProduct,
    VUpdateProductDetails,
} from "../../store/validators/store.validator";
import { objectIdValidator } from "../../store/validators";

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
            { storeId: req.params.userId, id: input.id },
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
