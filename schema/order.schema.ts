import { Schema } from "mongoose";

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
    },
    { timestamps: true }
);

export default OrderSchema;