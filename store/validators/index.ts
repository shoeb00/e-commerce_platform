import Joi from "joi";
import { EProductCategory } from "../enums/productCategory.enum";

export const objectIdValidator = Joi.string().required().length(12);
export const quantityValidator = Joi.number().required().min(1).max(10);
export const priceValidator = Joi.number().required().min(50);
export const nameValidator = Joi.string().required().min(3).max(30);
export const passwordValidator = Joi.string()
    .required()
    .min(5)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"));
export const categoryValidator = Joi.string().valid(
    ...Object.keys(EProductCategory)
);
