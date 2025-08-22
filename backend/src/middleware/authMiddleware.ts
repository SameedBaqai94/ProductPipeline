import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
    userId?: number;
}
const secret_key = process.env.JWT_SECRET_KEY || "YOUR_SECRET_KEY";

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.header("Authorization");

    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Access Denied or Invalid Token Format" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Access Denied" });
    }
    try {
        const decode = jwt.verify(token, secret_key) as { id: number };
        console.log(decode.id);
        (req as any).userId = decode.id;
        next();
    } catch (e) {
        return res.status(401).json({ error: "Invalid token" });
    }
}