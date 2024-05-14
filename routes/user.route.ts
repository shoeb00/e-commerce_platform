import { Router } from "express";
import {
    cancelOrder,
    ordersHistory,
    placeOrder,
    viewProducts,
} from "../controllers/user/orderManagement";
import { updateUserDetails } from "../controllers/user/profile";
import { authenticate } from "../authentication";
const userRouter = Router();

userRouter.get("/ordersHistory", authenticate, ordersHistory);
userRouter.get("/products", authenticate, viewProducts);

userRouter.post("/placeOrder", authenticate, placeOrder);

userRouter.put("/cancelOrder", authenticate, cancelOrder);
userRouter.put("/updateProfile", authenticate, updateUserDetails);

export default userRouter;
