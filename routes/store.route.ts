import { Router } from "express";
import { addProduct, register } from "../controllers/store";
import { updateUserDetails } from "../controllers/user/profile";
const storeRouter = Router();

storeRouter.get("/getAuthToken");

storeRouter.post("/register", register);
storeRouter.post("/addProduct", addProduct);

storeRouter.put("/updateProductDetails", updateUserDetails);

export default storeRouter;
