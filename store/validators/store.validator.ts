import Joi from "joi";
import {
    nameValidator,
    passwordValidator,
    quantityValidator,
    categoryValidator,
    priceValidator,
    phoneNumberValidator,
    objectIdValidator,
} from "./index";

export const VRegisterStore = Joi.object({
    name: nameValidator,
    ownerName: nameValidator,
    password: passwordValidator,
    phoneNumber: phoneNumberValidator,
}).min(4);

export const VAddProduct = Joi.object({
    name: nameValidator,
    category: categoryValidator,
    quantity: quantityValidator,
    price: priceValidator,
}).min(4);

export const VUpdateProductDetails = Joi.object({
    id: objectIdValidator.required(),
    name: nameValidator,
    category: categoryValidator,
    quantity: quantityValidator,
    price: priceValidator,
}).min(2);
