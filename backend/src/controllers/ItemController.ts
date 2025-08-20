import { Request, Response } from "express";
import { ItemWriteDto } from "../models/Item";
import { addItemService, getAItemService, getItemsByUserService } from "../services/ItemService";

export const addItemController = async (req: Request<{}, {}, ItemWriteDto>, res: Response) => {
    const { title, link, price, userId } = { ...req.body };

    if (!title || !link || !price || !userId) {
        return res.status(400).json({ error: "Missing required fields" })
    }
    const newItem = await addItemService({ title, link, price, userId });
    if (newItem.error) {
        return res.status(400).json(newItem.error)
    }
    return res.status(201).json(newItem.response)
}


export const getAllItemController = async (req: Request, res: Response) => {

    const items = await getAItemService();
    if (items.error) {
        return res.status(400).json(items.error)
    }
    return res.status(201).json(items.response)
}

export const getItemsByUserController = async (req: Request<{ userId: number }>, res: Response) => {
    const userId = req.params.userId;
    console.log(userId);
    const items = await getItemsByUserService(Number(userId));
    if (items.error) {
        return res.status(400).json(items.error)
    }
    return res.status(201).json(items.response)
}