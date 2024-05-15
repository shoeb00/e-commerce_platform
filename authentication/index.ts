import { google } from "googleapis";
import { database } from "../database";
import { cache } from "../database/cache";
import { ERoles } from "../store/enums/roles.enum";
import { Request, Response, NextFunction } from "express";

export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization?.split(" ").at(1) || "";
    const user = await cache.get(token);
    const role = req.baseUrl.split("/").at(1);
    if (!user) {
        res.redirect("/login");
    } else if (user.role.toLocaleLowerCase() !== role) {
        res.status(401).json({ message: "Unauthorized" });
    } else {
        req.params.userId = user.id || "";
        if (user.storeId) req.params.storeId = user.storeId;
        next();
    }
};

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    `${process.env.CALLBACK_URL}/google/callback`
);

export const authenticationURL = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: ["email", "profile"],
});

export const authCallback = async (req: Request, res: Response) => {
    const code = req.query.code?.toString();
    if (code) {
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
        const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
        const userDetails = await oauth2.userinfo.get();
        const userData = await database.User.findOne({
            email: userDetails.data.email,
        }).lean();
        const user = {
            id: userData?._id.toString(),
            name: userDetails.data.name,
            email: userDetails.data.email,
            role: userData?.role || ERoles.USER,
            storeId: userData?.storeId || null,
        };
        if (!userData) {
            const result = await database.User.create(user);
            user.id = result._id.toString();
        }
        const expiry = ((tokens.expiry_date || Date.now()) - Date.now()) / 1000;
        const token = tokens.access_token?.toString();
        if (token) await cache.set(token, user, Math.floor(expiry));
        return res.status(200).json({ token });
    }
    res.redirect("/login");
};
