import Joi from "joi";
import {
    nameValidator,
    passwordValidator,
    objectIdValidator,
    quantityValidator,
    categoryValidator,
    priceValidator,
    dateValidator,
} from "./index";

export const VUpdateProfile = Joi.object({
    name: nameValidator.optional(),
    password: passwordValidator.optional(),
}).min(1);

export const VBuyOrder = Joi.object({
    productId: objectIdValidator,
    quantity: quantityValidator,
});

export const VCancelOrder = Joi.object({
    productId: objectIdValidator,
});

export const VSearchProduct = Joi.object({
    category: categoryValidator,
    priceRange: priceValidator,
});

export const VOrderHistory = Joi.object({
    category: categoryValidator,
    startDate: dateValidator,
    endDate: dateValidator,
}).min(0);
