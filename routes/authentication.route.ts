import { Router } from "express";
import { authCallback, authenticationURL } from "../authentication";
import { cache } from "../database/cache";
const authRouter = Router();

authRouter.get("/google/callback", authCallback);

authRouter.get("/login", (req, res) => {
    res.status(200).json({ url: authenticationURL });
});

authRouter.get("/logout", async (req, res) => {
    const token = req.headers.authorization || "";
    await cache.delete(token);
    res.redirect("/welcome");
});

export default authRouter;
