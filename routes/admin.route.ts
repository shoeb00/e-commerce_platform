import { Router } from "express";
import { deleteStore } from "../controllers/store";
import { deleteUser } from "../controllers/user/profile";
const adminRouter = Router();

adminRouter.get("/getAuthToken");

adminRouter.delete("/deleteStore", deleteStore);
adminRouter.delete("/deleteUser", deleteUser);
adminRouter.delete("/deleteAdmin", deleteUser);

export default adminRouter;
