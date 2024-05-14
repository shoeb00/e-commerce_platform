import { Schema } from "mongoose";
import { EOrderStatus } from "../store/enums/orderStatus.enum";

const OrderSchema = new Schema(
    {
        totalPrice: {
            type: Number,
            required: true,
        },
        products: {
            type: Array<{
                quantity: number;
                productId: string;
            }>,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: EOrderStatus,
        },
    },
    { timestamps: true }
);

export default OrderSchema;
