import { Schema } from "mongoose";

const StoreSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        ownerName: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default StoreSchema;
