import { Router } from "express";
import {
    cancelOrder,
    ordersHistory,
    placeOrder,
    viewProducts,
} from "../controllers/user/orderManagement";
import { register, updateUserDetails } from "../controllers/user/profile";
const userRouter = Router();

userRouter.get("/getAuthToken");
userRouter.get("/ordersHistory", ordersHistory);
userRouter.get("/products", viewProducts);

userRouter.post("/register", register);
userRouter.post("/placeOrder", placeOrder);

userRouter.put("/cancelOrder", cancelOrder);
userRouter.put("/updateProfile", updateUserDetails);

export default userRouter;
