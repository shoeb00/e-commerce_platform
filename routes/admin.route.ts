import { Router } from "express";
import { deleteUser, updateUserDetails } from "../controllers/user/profile";
import { authenticate } from "../authentication";
const adminRouter = Router();

adminRouter.delete("/deleteUser", authenticate, deleteUser);
adminRouter.put("/updateUserDetails", authenticate, updateUserDetails);

export default adminRouter;
