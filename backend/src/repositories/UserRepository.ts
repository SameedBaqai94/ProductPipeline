import { PrismaClient } from '../generated/prisma/client.js';

const prisma = new PrismaClient();


export const createUser = async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}) => {
    return prisma.user.create({ data });
}

export const findByEmail = async (email: string) => {
    return prisma.user.findUnique({
        where: { email }
    });
}

const findById = async (id: string) => {
    return prisma.user.findUnique({
        where: { id }
    });
}

const update = async (
    id: string,
    data: {
        email?: string;
        password?: string;
        firstName?: string;
        lastName?: string;
    }
) => {
    return prisma.user.update({
        where: { id },
        data
    });
}


const deleteUser = async (id: string) => {
    return prisma.user.delete({
        where: { id }
    });
}

const findAll = async () => {
    return prisma.user.findMany();
}


const existsByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: { email }
    });
    return !!user;
}