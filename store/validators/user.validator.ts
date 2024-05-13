import Joi from "joi";
import {
    nameValidator,
    passwordValidator,
    objectIdValidator,
    quantityValidator,
    categoryValidator,
    priceValidator,
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
