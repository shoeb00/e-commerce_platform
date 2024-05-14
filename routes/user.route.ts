import { Router } from "express";
import {
    cancelOrder,
    ordersHistory,
    placeOrder,
    viewProducts,
} from "../controllers/user/orderManagement";
import { authenticate } from "../authentication";
const userRouter = Router();

userRouter.get("/ordersHistory", authenticate, ordersHistory);
userRouter.get("/products", authenticate, viewProducts);

userRouter.post("/placeOrder", authenticate, placeOrder);

userRouter.put("/cancelOrder", authenticate, cancelOrder);

export default userRouter;
