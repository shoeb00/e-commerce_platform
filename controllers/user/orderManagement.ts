import { Request, Response } from "express";
import database from "../../database";

const buyProducts = async (req: Request, res: Response) => {
    try {
        const { products } = req.body;
        const outOfStock = await database.Product.find({
            name: { $in: products },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

const cancelProduct = async (req: Request, res: Response) => {
    try {
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
