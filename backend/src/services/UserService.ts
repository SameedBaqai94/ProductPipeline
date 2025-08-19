import { PrismaClient } from "../../generated/prisma";
import type { LoginDto, UserReadDto, UserWriteDto } from "../models/User";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const SALT = 10;

interface UserServiceInterface {
    response?: string | UserReadDto;
    error?: string;
}

export const registerUserService = async (user: UserWriteDto): Promise<UserServiceInterface> => {
    try {
        if (await findEmail(user.email)) {
            return { error: "User already exist" }
        }
        const newUser = await prisma.user.create({
            data: {
                email: user.email,
                name: user.name,
                passwordHashed: await bcrypt.hash(user.passwordHashed, SALT)
            }
        });
        return { response: { email: newUser.email, name: newUser.name } }

    } catch (e) {
        return { error: "Resgisteration error" }
    }
}

export const signInUserService = async (user: LoginDto): Promise<UserServiceInterface> => {
    try {
        const getUser = await prisma.user.findFirst({
            where: {
                email: user.email
            }
        });

        if (getUser === null) {
            return { error: "User not found" }
        }
        if (!await bcrypt.compare(user.passwordHashed, getUser.passwordHashed)) {
            return { error: "Invalid password!" }
        }
        return { response: { email: getUser.email, name: getUser.name } }

    } catch (e) {
        return { error: "Sign In error" }
    }
}
const findEmail = async (email: string) => {
    return await prisma.user.findFirst({ where: { email: email } }) ? true : false;
}