import { Request, Response } from "express";
import { database } from "../../database";
import { objectIdValidator } from "../../store/validators";

export const deleteAdmin = async (req: Request, res: Response) => {
    try {
        const input = req.body.adminId;
        const { error } = objectIdValidator.validate(input);
        if (error) {
            console.log(error.message);
            return res.status(400).json({ message: "Invalid adminId" });
        }
        const result = await database.User.deleteOne({ id: input });
        res.status(201).json({
            message: "Admin deleted successfully",
            result,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
