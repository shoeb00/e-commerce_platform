import Joi from "joi";
import {
    nameValidator,
    quantityValidator,
    categoryValidator,
    priceValidator,
    objectIdValidator,
} from "./index";
import { EOrderStatus } from "../enums/orderStatus.enum";

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

export const VUpdateOrderStatus = Joi.object({
    id: objectIdValidator.required(),
    status: Joi.string()
        .valid(EOrderStatus.DELIVERED, EOrderStatus.OUT_FOR_DELIVERY)
        .insensitive()
        .required(),
});
