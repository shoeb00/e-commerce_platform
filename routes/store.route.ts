import { Router } from "express";
import {
    addProduct,
    addRandomProducts,
    updateProductDetails,
    viewProducts,
} from "../controllers/store";
import { authenticate } from "../authentication";
const storeRouter = Router();

storeRouter.get("/products", authenticate, viewProducts);

storeRouter.post("/addProduct", authenticate, addProduct);
storeRouter.post("/addRandomProducts", authenticate, addRandomProducts);

storeRouter.put("/updateProductDetails", authenticate, updateProductDetails);

export default storeRouter;
