import Joi from "joi";
import {
    nameValidator,
    quantityValidator,
    categoryValidator,
    priceValidator,
    objectIdValidator,
} from "./index";

export const VGetProduct = Joi.object({
    name: Joi.string().min(3),
    skip: Joi.number().min(0),
    limit: Joi.number().positive(),
    storeId: objectIdValidator.optional(),
    category: categoryValidator.optional(),
}).min(0);

export const VAddProduct = Joi.object({
    name: nameValidator,
    category: categoryValidator,
    quantity: quantityValidator,
    price: priceValidator,
    storeId: objectIdValidator,
}).min(5);

export const VUpdateProductDetails = Joi.object({
    id: objectIdValidator.required(),
    name: nameValidator,
    category: categoryValidator,
    quantity: quantityValidator,
    price: priceValidator,
}).min(2);
