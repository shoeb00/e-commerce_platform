import Joi from "joi";
import { EProductCategory } from "../enums/productCategory.enum";
import { EOrderStatus } from "../enums/orderStatus.enum";
import { ERoles } from "../enums/roles.enum";

export const objectIdValidator = Joi.string().required().length(24);
export const quantityValidator = Joi.number().required().min(1).max(20);
export const priceValidator = Joi.number().required().min(50);
export const nameValidator = Joi.string().required().min(3).max(30);
export const passwordValidator = Joi.string()
    .required()
    .min(5)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"));
export const categoryValidator = Joi.string().valid(
    ...Object.keys(EProductCategory)
);
export const orderStatusValidator = Joi.string().valid(
    ...Object.keys(EOrderStatus)
);
export const roleValidator = Joi.string().valid(...Object.keys(ERoles));
export const dateValidator = Joi.string()
    .required()
    .length(10)
    .pattern(/^\d{4}-\d{2}-\d{2}$/);
export const phoneNumberValidator = Joi.string()
    .required()
    .length(10)
    .pattern(new RegExp("^d{10}"));
