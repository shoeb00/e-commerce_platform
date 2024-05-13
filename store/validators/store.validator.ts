import { object } from "joi";
import {
    nameValidator,
    objectIdValidator,
    priceValidator,
    categoryValidator,
} from "./index";

export const VAddProduct = object({
    name: nameValidator,
    quantity: priceValidator,
    price: priceValidator,
    category: categoryValidator,
});

export const VUpdateProductDetails = object({
    name: nameValidator.optional(),
    quantity: priceValidator.optional(),
    category: categoryValidator.optional(),
    price: priceValidator.optional(),
}).min(1);

export const VDeleteProduct = object({
    productId: objectIdValidator,
});
