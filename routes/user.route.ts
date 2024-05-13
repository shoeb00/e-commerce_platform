import { Router } from "express";
const userRouter = Router();

userRouter.get("/getAuthToken");
userRouter.get("/ordersHistory");
userRouter.get("/products");

userRouter.post("/register");
userRouter.post("/buyOrder");

userRouter.put("/cancelOrder");
userRouter.put("/updateProfile");

export default userRouter;
