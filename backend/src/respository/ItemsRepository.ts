import { PrismaClient } from "../../generated/prisma/index.js";
import { itemWrite } from "../models/Items.js";

const prisma = new PrismaClient();

export const addItemRepository = async (item: itemWrite, id: number) => {

    return prisma.item.create({
        data: {
            title: item.title,
            description: item.description,
            link: item.link,
            image: item.image,
            price: item.price,
            status: item.status,
            userId: id
        }
    })
}

export const getAllItemsRepository = async () => {
    return prisma.item.findMany();
}

export const getItemByIdRepository = async (itemId: number) => {
    return prisma.item.findUnique({ where: { id: itemId } });
}

export const updateItemRepository = async (itemId: number, data: Partial<itemWrite>) => {
    return prisma.item.update({
        where: { id: itemId },
        data: { ...data }
    });
}

export const deleteItemRepository = async (itemId: number) => {
    return prisma.item.delete({ where: { id: itemId } });
}