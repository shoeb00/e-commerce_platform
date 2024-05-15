import { Schema } from "mongoose";
import { EProductCategory } from "../store/enums/productCategory.enum";

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
            min: 0,
        },
        category: {
            type: String,
            enum: EProductCategory,
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
