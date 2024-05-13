import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.route";
import storeRouter from "./routes/store.route";
import adminRouter from "./routes/admin.route";
import { json, urlencoded } from "body-parser";
import database from "./database";

const app = express();
app.use(json());
app.use(urlencoded({ extended: false }));
app.use("/user", userRouter);
app.use("/store", storeRouter);
app.use("/admin", adminRouter);

const PORT = process.env.PORT;
const server = app.listen(PORT, async () => {
    console.log(`Server is running on port: ${PORT}`);
});

server.on("listening", async () => {
    try {
        await database.connect();
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Failed to connect to the database:", error);
        process.exit(0);
    }
});

process.on("SIGINT", async () => {
    mongoose
        .disconnect()
        .then(() => console.log("Database connection closed"))
        .catch((error) =>
            console.error("Error while closing the database connection:", error)
        )
        .finally(() => {
            console.log("Server stopped");
            process.exit(0);
        });
});
