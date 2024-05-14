import { Router } from "express";
import { addProduct } from "../controllers/store";
import { updateUserDetails } from "../controllers/user/profile";
import { authenticate } from "../authentication";
const storeRouter = Router();

storeRouter.post("/addProduct", authenticate, addProduct);

storeRouter.put("/updateProductDetails", authenticate, updateUserDetails);

export default storeRouter;
