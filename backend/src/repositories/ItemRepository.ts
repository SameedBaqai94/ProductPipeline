import { PrismaClient } from '../generated/prisma/client.js';
import { ItemWriteDto } from '../models/Item.js';

const prisma = new PrismaClient();

export const createItem = async (data: ItemWriteDto, userId: string) => {
    return prisma.item.create({
        data: {
            ...data,
            userId
        }
    });
}

export const findAllItems = async () => {
    return prisma.item.findMany({
        include: {
            user: {
                select: {
                    id: true,
                    email: true,
                    firstName: true,
                    lastName: true
                }
            }
        }
    });
}

export const findItemById = async (itemId: string) => {
    return prisma.item.findUnique({
        where: { id: itemId },
        include: {
            user: {
                select: {
                    id: true,
                    email: true,
                    firstName: true,
                    lastName: true
                }
            }
        }
    });
}

export const findItemsByUserId = async (userId: string) => {
    return prisma.item.findMany({
        where: { userId },
        include: {
            user: {
                select: {
                    id: true,
                    email: true,
                    firstName: true,
                    lastName: true
                }
            }
        }
    });
}

export const updateItem = async (itemId: string, data: Partial<ItemWriteDto>) => {
    return prisma.item.update({
        where: { id: itemId },
        data,
        include: {
            user: {
                select: {
                    id: true,
                    email: true,
                    firstName: true,
                    lastName: true
                }
            }
        }
    });
}

export const deleteItem = async (itemId: string) => {
    return prisma.item.delete({
        where: { id: itemId }
    });
}

