import { signIn, userRead, userWrite } from "../models/User.js";
import { usersSigninRepository, usersRegisterRepository } from "../respository/UsersRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface UsersServiceInterface {
    error?: string;
    message?: string | userRead
};

const JWT_SECRET = process.env.JWT_SECRET!;

export const usersSigninService = async (user: signIn): Promise<UsersServiceInterface> => {
    try {
        const { email, passwordHashed } = { ...user };

        const getUser = await usersSigninRepository(email);
        if (!getUser) {
            return { error: "User not found" };
        }
        if (!await bcrypt.compare(passwordHashed, getUser.passwordHashed)) {
            return { error: "Password incorrect" };
        }

        const token = jwt.sign({
            id: getUser.id
        }, JWT_SECRET, { expiresIn: '30m' })

        return { message: token }

    } catch (ex) {
        console.log(ex);
        return { error: "An unexpected error occurred" };
    }
}

export const userRegisterService = async (user: userWrite): Promise<UsersServiceInterface> => {
    try {
        const { name, email, passwordHashed } = { ...user };
        const salt = await bcrypt.genSalt(10);

        const newUser = await usersRegisterRepository(name, email, await bcrypt.hash(passwordHashed, salt));
        if (newUser) {
            return {
                message: {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email
                }
            }
        }
        return { error: "Something wrong with registering user" }
    } catch (ex) {
        return { error: "An unexpected error occurred" };
    }
}