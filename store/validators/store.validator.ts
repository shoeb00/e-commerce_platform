import { object } from "joi";
import {
    nameValidator,
    objectIdValidator,
    numberValidator,
    categoryValidator,
} from "./index";

export const VAddProduct = object({
    name: nameValidator,
    quantity: numberValidator,
    price: numberValidator,
    category: categoryValidator,
});

export const VUpdateProductDetails = object({
    name: nameValidator.optional(),
    quantity: numberValidator.optional(),
    category: categoryValidator.optional(),
    price: numberValidator.optional(),
}).min(1);

export const VDeleteProduct = object({
    productId: objectIdValidator,
});
