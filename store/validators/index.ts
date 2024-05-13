import { string, number } from "joi";
import { EProductCategory } from "../enums/productCategory.enum";

export const objectIdValidator = string().required().length(12);
export const numberValidator = number().required().min(1).max(10);
export const nameValidator = string().required().min(3).max(30);
export const passwordValidator = string()
    .required()
    .min(5)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"));
export const categoryValidator = string().valid(
    ...Object.keys(EProductCategory)
);
