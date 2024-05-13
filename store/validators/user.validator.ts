import Joi from "joi";
import {
    nameValidator,
    passwordValidator,
    objectIdValidator,
    quantityValidator,
    categoryValidator,
    priceValidator,
    dateValidator,
    phoneNumberValidator,
} from "./index";

export const VRegisterUser = Joi.object({
    name: nameValidator,
    password: passwordValidator,
    phoneNumber: phoneNumberValidator,
    storeId: objectIdValidator,
});

export const VUpdateProfile = Joi.object({
    name: nameValidator.optional(),
    password: passwordValidator.optional(),
    phoneNumber: phoneNumberValidator,
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
