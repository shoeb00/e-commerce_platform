import { Router } from "express";
const adminRouter = Router();

adminRouter.get("/getAuthToken");
adminRouter.get("/getAllAdmins");

adminRouter.post("/register");

adminRouter.delete("/deleteStore");
adminRouter.delete("/deleteUser");
adminRouter.delete("/deleteAdmin");

export default adminRouter;
