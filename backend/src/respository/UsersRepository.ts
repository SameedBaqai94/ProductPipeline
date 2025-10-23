import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();

export const usersSigninRepository = async (email: string) => {
    return await prisma.user.findUnique({
        where: {
            email: email
        }
    });
};

export const usersRegisterRepository = async (name: string, email: string, passwordHashed: string) => {
    return await prisma.user.create({
        data: {
            name: name,
            email: email,
            passwordHashed: passwordHashed
        }
    });
};