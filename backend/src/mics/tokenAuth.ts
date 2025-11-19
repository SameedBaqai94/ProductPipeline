import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const JWT_SECRET: string = process.env.JWT_SECRET || "your_secret_key_here";

interface DecodedToken extends JwtPayload {
    id: string;
    email: string;
}

/**
 * Verify JWT token string and return decoded payload
 */
export const verifyTokenString = (token: string): DecodedToken | null => {
    console.log(token);
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as unknown as DecodedToken;
        return decoded;
    } catch (error) {
        return null;
    }
};

/**
 * Express middleware to verify JWT token from Authorization header
 */
export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            res.status(401).json({ success: false, message: 'No authorization header provided' });
            return;
        }

        // Extract token from "Bearer <token>"
        const parts = authHeader.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            res.status(401).json({ success: false, message: 'Invalid authorization header format' });
            return;
        }

        const token = parts[1] || "";

        try {
            const decoded = jwt.verify(token, JWT_SECRET) as unknown as DecodedToken;
            // Attach user info to request
            (req as any).user = decoded;
            next();
        } catch (error) {
            res.status(403).json({ success: false, message: 'Invalid or expired token' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Token verification error' });
    }
};
