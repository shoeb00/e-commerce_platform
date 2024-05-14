import { Schema } from "mongoose";
import { ERoles } from "../store/enums/roles.enum";
import { IUser } from "../store/interfaces/user.interface";

const UserSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        storeId: String,
        role: {
            type: String,
            enum: ERoles,
        },
    },
    { timestamps: true }
);

export default UserSchema;
