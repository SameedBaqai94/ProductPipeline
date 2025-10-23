import { Request, Response } from "express";
import { signIn, userWrite } from "../models/User.js";
import { userRegisterService, usersSigninService } from "../service/UsersService.js";

export const userSignInController = async (req: Request<{}, {}, signIn>, res: Response) => {
    const { email, passwordHashed } = req.body;

    if (!email || !passwordHashed) {
        return res.status(400).json({ status: "Fill in required fields" });
    }
    const user = await usersSigninService({ email, passwordHashed });
    if (user.error) {
        return res.status(401).json({ status: user.error });
    }
    return res.status(200).json({ status: user.message });
}

export const userRegisterController = async (req: Request<{}, {}, userWrite>, res: Response) => {

    const { name, email, passwordHashed } = req.body;
    console.log(name, email, passwordHashed);
    if (!name || !email || !passwordHashed) {
        return res.status(400).json({ status: "Fill in required fields" });
    }
    const user = await userRegisterService({ name, email, passwordHashed });
    if (user.error) {
        return res.status(401).json({ status: user.error });
    }
    return res.status(200).json({ status: user.message });
}