import { Router } from "express";
import { addProduct, updateProductDetails } from "../controllers/store";
import { authenticate } from "../authentication";
const storeRouter = Router();

storeRouter.post("/addProduct", authenticate, addProduct);

storeRouter.put("/updateProductDetails", authenticate, updateProductDetails);

export default storeRouter;
