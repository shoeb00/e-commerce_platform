import { Schema } from "mongoose";

const ProductSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        storeId: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default ProductSchema;
