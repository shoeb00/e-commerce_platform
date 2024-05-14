import Joi from "joi";
import {
    nameValidator,
    quantityValidator,
    categoryValidator,
    priceValidator,
    objectIdValidator,
} from "./index";

export const VAddProduct = Joi.object({
    name: nameValidator,
    category: categoryValidator,
    quantity: quantityValidator,
    price: priceValidator,
    storeId: objectIdValidator,
}).min(4);

export const VUpdateProductDetails = Joi.object({
    id: objectIdValidator.required(),
    name: nameValidator,
    category: categoryValidator,
    quantity: quantityValidator,
    price: priceValidator,
}).min(2);
