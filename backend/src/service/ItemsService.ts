import { describe } from "node:test";
import { itemRead, itemWrite } from "../models/Items.js";
import { addItemRepository, getAllItemsRepository, getItemByIdRepository, updateItemRepository, deleteItemRepository } from "../respository/ItemsRepository.js";

interface ItemsServiceInterface {
    error?: string;
    message?: string | itemRead | itemRead[];
};

export const addItemsService = async (item: itemWrite, userId: number): Promise<ItemsServiceInterface> => {
    try {
        const { title, description, link, image, price, status } = { ...item };

        const newItem = await addItemRepository({ title, description, link, image, price, status }, userId);
        if (newItem) {
            return {
                message: {
                    title: newItem.title,
                    description: newItem.description,
                    link: newItem.link,
                    image: newItem.image,
                    price: newItem.price,
                    status: newItem.status
                }
            }
        }
        return { error: "Something wrong with adding new item" }
    } catch (ex) {
        return { error: "An unexpected error occurred" };
    }
}

export const getAllItemsService = async (): Promise<ItemsServiceInterface> => {
    try {
        const items = await getAllItemsRepository();
        const itemsDTO = items.map((item) => {
            return {
                title: item.title,
                description: item.description,
                link: item.link,
                image: item.image,
                price: item.price,
                status: item.status
            }
        })
        return { message: itemsDTO };
    } catch (ex) {
        return { error: 'An unexpected error occurred' };
    }
}

export const getItemByIdService = async (itemId: number): Promise<ItemsServiceInterface> => {
    try {
        const item = await getItemByIdRepository(itemId);
        if (!item) return { error: 'Item not found' };
        const itemDTO = {
            title: item.title,
            description: item.description,
            link: item.link,
            image: item.image,
            price: item.price,
            status: item.status

        }
        return { message: itemDTO };
    } catch (ex) {
        return { error: 'An unexpected error occurred' };
    }
}

export const updateItemService = async (itemId: number, data: Partial<itemWrite>): Promise<ItemsServiceInterface> => {
    try {
        const updated = await updateItemRepository(itemId, data);
        const itemDTO = {
            title: updated.title,
            description: updated.description,
            link: updated.link,
            image: updated.image,
            price: updated.price,
            status: updated.status

        }
        return { message: itemDTO };
    } catch (ex) {
        return { error: 'An unexpected error occurred' };
    }
}

export const deleteItemService = async (itemId: number): Promise<ItemsServiceInterface> => {
    try {
        await deleteItemRepository(itemId);
        return { message: 'Item deleted' };
    } catch (ex) {
        return { error: 'An unexpected error occurred' };
    }
}