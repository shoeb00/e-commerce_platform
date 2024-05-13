import { Request, Response } from "express";
import database from "../../database";
import {
    VRegisterUser,
    VUpdateProfile,
} from "../../store/validators/user.validator";
import { hashSync } from "bcrypt";

export const register = async (req: Request, res: Response) => {
    try {
        const input = req.body;
        const { error } = VRegisterUser.validate(input);
        if (error) {
            console.log(error.message);
            return res.status(400).json({ message: error.message });
        }
        const password = hashSync(input.password, 10);
        input.password = password;
        const result = await database.User.create(input);
        res.status(201).json({
            message: "User registration is successful",
            result,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const updateUserDetails = async (req: Request, res: Response) => {
    try {
        const input = req.body;
        const { error } = VUpdateProfile.validate(input);
        if (error) {
            console.log(error.message);
            return res.status(400).json({ message: error.message });
        }
        if (input.password) {
            const password = hashSync(input.password, 10);
            input.password = password;
        }
        const result = await database.User.updateOne(
            { id: req.body.user.id },
            input
        );
        res.status(201).json({
            message: "User details updated successfully",
            result,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
