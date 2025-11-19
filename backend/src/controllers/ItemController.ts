import { Request, Response } from 'express';
import { ItemWriteDto, ItemResponseDTO } from '../models/Item.js';
import { createItemService, getAllItemsService, getItemByIdService, updateItemService, deleteItemService } from '../services/ItemService.js';

interface AuthRequest<P = {}, ResBody = any, ReqBody = any> extends Request<P, ResBody, ReqBody> {
    user?: {
        id: string;
        email: string;
    };
}

export const createItemController = async (req: AuthRequest<{}, any, ItemWriteDto>, res: Response): Promise<void> => {
    try {
        const { title, description, link, image, price, status } = req.body;
        const userId = req.user?.id;

        if (!title || !description || !link || !image || !price || !status) {
            res.status(400).json({
                success: false,
                message: 'Missing required fields: title, description, link, image, price, status'
            });
            return;
        }

        if (!userId) {
            res.status(401).json({
                success: false,
                message: 'Unauthorized: User ID not found'
            });
            return;
        }

        const result = await createItemService({ title, description, link, image, price, status }, userId);
        res.status(result.success ? 201 : 400).json(result);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error during item creation'
        });
    }
}

export const getAllItemsController = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await getAllItemsService();
        res.status(result.success ? 200 : 400).json(result);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error while retrieving items'
        });
    }
}

export const getItemByIdController = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({
                success: false,
                message: 'Item ID is required'
            });
            return;
        }

        const result = await getItemByIdService(id);
        res.status(result.success ? 200 : 404).json(result);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error while retrieving the item'
        });
    }
}

export const updateItemController = async (req: AuthRequest<{ id: string }, any, Partial<ItemWriteDto>>, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;

        if (!id) {
            res.status(400).json({
                success: false,
                message: 'Item ID is required'
            });
            return;
        }

        if (!userId) {
            res.status(401).json({
                success: false,
                message: 'Unauthorized: User ID not found'
            });
            return;
        }

        const result = await updateItemService(id, req.body, userId);
        res.status(result.success ? 200 : result.message.includes('permission') ? 403 : 404).json(result);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error while updating the item'
        });
    }
}

export const deleteItemController = async (req: AuthRequest<{ id: string }, any, any>, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;

        if (!id) {
            res.status(400).json({
                success: false,
                message: 'Item ID is required'
            });
            return;
        }

        if (!userId) {
            res.status(401).json({
                success: false,
                message: 'Unauthorized: User ID not found'
            });
            return;
        }

        const result = await deleteItemService(id, userId);
        res.status(result.success ? 200 : result.message.includes('permission') ? 403 : 404).json(result);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error while deleting the item'
        });
    }
}
