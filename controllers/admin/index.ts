import { Request, Response } from "express";
import database from "../../database";
import { hashSync } from "bcrypt";
import { objectIdValidator } from "../../store/validators";
import { VRegisterAdmin } from "../../store/validators/admin.validator";

export const register = async (req: Request, res: Response) => {
    try {
        const input = req.body;
        const { error } = VRegisterAdmin.validate(input);
        if (error) {
            console.log(error.message);
            return res.status(400).json({ message: error.message });
        }
        const password = hashSync(input.password, 10);
        input.password = password;
        const result = await database.Admin.create(input);
        res.status(201).json({
            message: "Admin registration is successful",
            result,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const deleteAdmin = async (req: Request, res: Response) => {
    try {
        const input = req.body.adminId;
        const { error } = objectIdValidator.validate(input);
        if (error) {
            console.log(error.message);
            return res.status(400).json({ message: "Invalid adminId" });
        }
        const result = await database.Admin.deleteOne({ id: input });
        res.status(201).json({
            message: "Admin deleted successfully",
            result,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
