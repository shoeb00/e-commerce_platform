import { Router } from "express";
const storeRouter = Router();

storeRouter.get("/getAuthToken");
storeRouter.get("/getProducts");

storeRouter.post("/register");
storeRouter.post("/addProduct");

storeRouter.put("/updateProductDetails");

storeRouter.delete("/deleteProduct");

export default storeRouter;
