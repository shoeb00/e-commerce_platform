import { Router } from "express";
import {
    addProduct,
    addRandomProducts,
    updateProductDetails,
    viewProducts,
} from "../controllers/store";
import { authenticate } from "../authentication";
import { updateOrderStatus } from "../controllers/user/orderManagement";
const storeRouter = Router();

storeRouter.get("/products", authenticate, viewProducts);

storeRouter.post("/addProduct", authenticate, addProduct);
storeRouter.post("/addRandomProducts", authenticate, addRandomProducts);

storeRouter.put("/updateProductDetails", authenticate, updateProductDetails);
storeRouter.put("/updateOrderStatus", authenticate, updateOrderStatus);

export default storeRouter;
