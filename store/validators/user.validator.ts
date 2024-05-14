import Joi from "joi";
import {
    objectIdValidator,
    quantityValidator,
    categoryValidator,
    dateValidator,
    roleValidator,
    orderStatusValidator,
} from "./index";

export const VUpdateProfile = Joi.object({
    storeId: objectIdValidator,
    role: roleValidator,
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
    startDate: dateValidator,
    endDate: dateValidator,
    status: orderStatusValidator,
}).min(0);

export const VOrderHistory = Joi.object({
    category: categoryValidator,
    startDate: dateValidator,
    endDate: dateValidator,
}).min(0);
