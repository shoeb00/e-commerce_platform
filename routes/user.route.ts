import { Router } from "express";
import {
    cancelOrder,
    ordersHistory,
    placeOrder,
    viewProducts,
} from "../controllers/user/orderManagement";
const userRouter = Router();

userRouter.get("/getAuthToken");
userRouter.get("/ordersHistory", ordersHistory);
userRouter.get("/products", viewProducts);

userRouter.post("/register");
userRouter.post("/placeOrder", placeOrder);

userRouter.put("/cancelOrder", cancelOrder);
userRouter.put("/updateProfile");

export default userRouter;
