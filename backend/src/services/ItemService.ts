import { ItemReadDto, ItemWriteDto } from "../models/Item";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

interface ItemServiceInterface {
    response?: string | ItemReadDto | ItemReadDto[];
    error?: string;
}

export const addItemService = async (item: ItemWriteDto): Promise<ItemServiceInterface> => {
    try {
        if (await checkItemExist(item.title)) {
            return { error: "item already exist" }
        }
        const newItem = await prisma.item.create({
            data: {
                title: item.title,
                link: item.link,
                price: item.price,
                status: item.status,
                userId: item.userId
            }
        });
        return { response: { title: newItem.title, link: newItem.link, price: newItem.price, status: item.status } }

    } catch (e) {
        return { error: "Adding item error" }
    }
}

export const getAItemService = async (): Promise<ItemServiceInterface> => {
    try {
        const items = await prisma.item.findMany();

        const itemsMap = items.map(item => ({
            title: item.title,
            link: item.link,
            price: item.price,
            status: item.status
        }));
        return { response: itemsMap }

    } catch (e) {
        return { error: "error" }
    }
}

export const getItemsByUserService = async (userId: number): Promise<ItemServiceInterface> => {
    try {
        if (!await prisma.user.findUnique({ where: { id: userId } })) {
            return { error: "user not found" }
        }

        const items = await prisma.item.findMany({
            where: {
                userId: userId
            }
        })

        const itemsMap = items.map(item => ({
            title: item.title,
            link: item.link,
            price: item.price,
            status: item.status
        }));
        return { response: itemsMap }

    } catch (e) {
        return { error: "error" }
    }
}

const checkItemExist = async (title: string) => {
    return await prisma.item.findFirst({ where: { title: title } }) ? true : false;
}