import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env";
import RequestWithUser from "../types/user.request.type";

export const authMiddleware = (req: RequestWithUser, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    try {
        const decoded = jwt.verify(token, ENV.JWT_SECRET) as { id: string; role: string };
        req.user = decoded;
        next();
    } catch {
        res.status(401).json({ error: "Bad token" });
        return;
    }
};
