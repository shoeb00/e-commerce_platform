import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.route";
import storeRouter from "./routes/store.route";
import adminRouter from "./routes/admin.route";
import authRouter from "./routes/authentication.route";
import { json, urlencoded } from "body-parser";
import { database } from "./database";
import { cache } from "./database/cache";

const app = express();
app.use(json());
app.use(urlencoded({ extended: false }));
app.use("/user", userRouter);
app.use("/store", storeRouter);
app.use("/admin", adminRouter);
app.use(authRouter);

const PORT = process.env.PORT;
const server = app.listen(PORT, async () => {
    console.log(`Server is running on port: ${PORT}`);
});

server.on("listening", async () => {
    try {
        await database.connect();
        await cache.connect();
        console.log("Databases connected successfully");
    } catch (error) {
        console.error("Failed to connect to the database:", error);
        process.exit(0);
    }
});

app.get("/welcome", async function (req, res) {
    return res.status(200).json({
        message:
            "Welcome to ABZ E-Commerce platform, the only store you will ever need",
    });
});

process.on("SIGINT", async () => {
    try {
        await mongoose.disconnect();
        await cache.disconnect();
        console.log("Databases connection closed");
    } catch (error) {
        console.error("Error while closing the database connection:", error);
    } finally {
        process.exit(0);
    }
});
