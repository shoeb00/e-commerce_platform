import mongoose, { Model, Mongoose } from "mongoose";
import UserSchema from "../schema/user.schema";
import { IUser } from "../store/interfaces/user.interface";
import { IProduct } from "../store/interfaces/product.interface";
import ProductSchema from "../schema/product.schema";
import { IOrder } from "../store/interfaces/order.interface";
import OrderSchema from "../schema/order.schema";

class Database {
    private connection!: Mongoose;
    private DB_URL: string;
    User!: Model<IUser>;
    Product!: Model<IProduct>;
    Order!: Model<IOrder>;
    constructor() {
        this.DB_URL =
            process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/e-commerce";
        // this.connect();
    }
    async connect() {
        mongoose.connect(this.DB_URL).then((connection) => {
            this.connection = connection;
            this.createModels();
        });
    }
    createModels() {
        this.User = this.connection.model<IUser>("user", UserSchema, "users");
        this.Product = this.connection.model<IProduct>(
            "product",
            ProductSchema,
            "products"
        );
        this.Order = this.connection.model<IOrder>(
            "order",
            OrderSchema,
            "orders"
        );
    }
}

export const database = new Database();
