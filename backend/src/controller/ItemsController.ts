import { Request, Response } from "express";
import { itemWrite } from "../models/Items.js";
import { addItemsService, getAllItemsService, getItemByIdService, updateItemService, deleteItemService } from "../service/ItemsService.js";

export const itemsAddController = async (req: Request<{}, {}, itemWrite>, res: Response) => {
    const { title, description, link, image, price, status } = { ...req.body };
    const id = req.user?.id;

    if (!title || !description || !link || !image || !price || !status) {
        return res.status(400).json({ status: "Fill in required fields" });
    }
    const newItem = await addItemsService({ title, description, link, image, price, status }, id as number);

    if (newItem.error) {
        return res.status(401).json({ status: newItem.error });
    }
    return res.status(200).json({ status: newItem.message });

}

export const itemsListAllController = async (_req: Request, res: Response) => {
    const items = await getAllItemsService();
    if (items.error) return res.status(401).json({ status: items.error });
    return res.status(200).json({ status: items.message });
}

export const itemsGetByIdController = async (req: Request, res: Response) => {
    const idParam = req.params.id;
    if (!idParam) return res.status(400).json({ status: 'Missing id' });
    const id = parseInt(idParam, 10);
    if (isNaN(id)) return res.status(400).json({ status: 'Invalid id' });

    const item = await getItemByIdService(id);
    if (item.error) return res.status(404).json({ status: item.error });
    return res.status(200).json({ status: item.message });
}

export const itemsUpdateController = async (req: Request, res: Response) => {
    const idParam = req.params.id;
    if (!idParam) return res.status(400).json({ status: 'Missing id' });
    const id = parseInt(idParam, 10);
    const data = req.body as Partial<itemWrite>;
    if (isNaN(id)) return res.status(400).json({ status: 'Invalid id' });

    const updated = await updateItemService(id, data);
    if (updated.error) return res.status(401).json({ status: updated.error });
    return res.status(200).json({ status: updated.message });
}

export const itemsDeleteController = async (req: Request, res: Response) => {
    const idParam = req.params.id;
    if (!idParam) return res.status(400).json({ status: 'Missing id' });
    const id = parseInt(idParam, 10);
    if (isNaN(id)) return res.status(400).json({ status: 'Invalid id' });

    const deleted = await deleteItemService(id);
    if (deleted.error) return res.status(401).json({ status: deleted.error });
    return res.status(200).json({ status: deleted.message });
}
