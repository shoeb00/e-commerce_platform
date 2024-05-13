import { Request, Response } from "express";
import database from "../../database";

const register = async (req: Request, res: Response) => {
    try {
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

const updateUserDetails = async (req: Request, res: Response) => {
    try {

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
