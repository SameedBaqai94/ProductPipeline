import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET ?? 'secret key';

export interface TokenPayload extends JwtPayload {
    id?: string | number;
}

declare module 'express-serve-static-core' {
    interface Request {
        user?: TokenPayload;
    }
}

/** Middleware: verifies JWT and attaches payload to req.user */
export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = typeof authHeader === 'string' ? authHeader.split(' ')[1] : undefined;

    if (!token) {
        return res.status(401).json({ message: 'Access token required' });
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET) as TokenPayload;
        req.user = payload;
        return next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
}

/** Verify a token string and return the decoded payload or null */
export const verifyTokenString = (token: string): TokenPayload | null => {
    try {
        return jwt.verify(token, JWT_SECRET) as TokenPayload;
    } catch (err) {
        return null;
    }
}

/** Get user id from a token string (returns string|number|null) */
export const getUserIdFromToken = (token: string): string | number | null => {
    const payload = verifyTokenString(token);
    return payload?.id ?? null;
}

/** Get user id from an Express request (returns string|number|null) */
export const getUserIdFromRequest = (req: Request): string | number | null => {
    return req.user?.id ?? null;
}