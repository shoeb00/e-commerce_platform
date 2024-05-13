import { object } from "joi";
import {
    nameValidator,
    passwordValidator,
    objectIdValidator,
    numberValidator,
    categoryValidator,
} from "./index";

export const VUpdateProfile = object({
    name: nameValidator.optional(),
    password: passwordValidator.optional(),
}).min(1);

export const VBuyOrder = object({
    productId: objectIdValidator,
    quantity: numberValidator,
});

export const VCancelOrder = object({
    productId: objectIdValidator,
});

export const VSearchProduct = object({
    category: categoryValidator,
    priceRange: numberValidator,
});
