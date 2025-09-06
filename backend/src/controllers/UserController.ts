import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { LoginDto, UserWriteDto } from "../models/User";
import { registerUserService, signInUserService } from "../services/UserService";

const secret_key = process.env.JWT_SECRET_KEY || "YOUR_SECRET_KEY";

export const registerUserController = async (req: Request<{}, {}, UserWriteDto>, res: Response) => {
    const { email, name, passwordHashed } = { ...req.body };
    if (!email || !name || !passwordHashed) {
        return res.status(400).json({ error: "Missing required fields" })
    }

    const newUser = await registerUserService({ email, name, passwordHashed });
    if (newUser.error) {
        return res.status(400).json(newUser.error)
    }
    return res.status(201).json(newUser.response)
}

export const signInController = async (req: Request<{}, {}, LoginDto>, res: Response) => {
    const { email, passwordHashed } = { ...req.body };
    if (!email || !passwordHashed) {
        return res.status(400).json({ error: "Missing required fields" })
    }

    const user = await signInUserService({ email, passwordHashed });
    if (user.error) {
        return res.status(400).json(user.error)
    }
    if (user.response) {
        const payload = {
            id: user.response.id,
            email: user.response.email,
        };

        const token = jwt.sign(payload, secret_key, {
            expiresIn: '1hr'
        });

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 1000
        })
        return res.status(201).json({
            user: {
                id: user.response.id,
                email: user.response.email,
                name: user.response.name
            }
        })
    }
}