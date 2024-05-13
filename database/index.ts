import mongoose, { Model } from "mongoose";
import UserSchema from "../schema/user.schema";
import StoreSchema from "../schema/store.schema";
import { IUser } from "../store/interfaces/user.interface";
import { IStore } from "../store/interfaces/store.interface";
import { IAdmin } from "../store/interfaces/admin.interface";
import AdminSchema from "../schema/admin.schema";
import { IProduct } from "../store/interfaces/product.interface";
import ProductSchema from "../schema/product.schema";
import { IOrder } from "../store/interfaces/order.interface";
import OrderSchema from "../schema/order.schema";

const DB_URL =
    process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/e-commerce";

class Database {
    User: Model<IUser>;
    Store: Model<IStore>;
    Admin: Model<IAdmin>;
    Product: Model<IProduct>;
    Order: Model<IOrder>;
    async connect() {
        try {
            const connection = await mongoose.connect(DB_URL);
            this.User = connection.model<IUser>("users", UserSchema);
            this.Store = connection.model<IStore>("stores", StoreSchema);
            this.Admin = connection.model<IAdmin>("admins", AdminSchema);
            this.Product = connection.model<IProduct>(
                "products",
                ProductSchema
            );
            this.Order = connection.model<IOrder>("orders", OrderSchema);
        } catch (error) {
            throw error;
        }
    }
}

export default new Database();
