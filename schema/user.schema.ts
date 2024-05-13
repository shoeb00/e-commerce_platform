import { Schema } from "mongoose";

const UserSchema = new Schema(
    {
        name: {
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
        storeId: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default UserSchema;
