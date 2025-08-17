import type { Request, Response } from "express";
import type { LoginDto, UserWriteDto } from "../models/User";
import { registerUserService, signInUserService } from "../services/UserService";

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
    return res.status(201).json(user.response)
}