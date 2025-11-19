import { ItemWriteDto, ItemResponseDTO, Item } from "../models/Item.js";
import { createItem, findAllItems, findItemById, findItemsByUserId, updateItem, deleteItem } from "../repositories/ItemRepository.js";

export const createItemService = async (item: ItemWriteDto, userId: string): Promise<{ success: boolean; message: string; data?: any }> => {
    try {
        // Validate required fields
        if (!item.title || !item.description || !item.link || !item.image || !item.price || !item.status) {
            return {
                success: false,
                message: 'All fields (title, description, link, image, price, status) are required'
            };
        }

        const newItem = await createItem(item, userId);

        return {
            success: true,
            message: 'Item created successfully',
            data: newItem
        };
    } catch (error) {
        console.error('Create item error:', error);
        return {
            success: false,
            message: 'An error occurred during item creation'
        };
    }
}

export const getAllItemsService = async (): Promise<{ success: boolean; message: string; data?: any[] }> => {
    try {
        const items = await findAllItems();

        return {
            success: true,
            message: 'Items retrieved successfully',
            data: items
        };
    } catch (error) {
        console.error('Get all items error:', error);
        return {
            success: false,
            message: 'An error occurred while retrieving items'
        };
    }
}

export const getItemByIdService = async (itemId: string): Promise<{ success: boolean; message: string; data?: any }> => {
    try {
        if (!itemId) {
            return {
                success: false,
                message: 'Item ID is required'
            };
        }

        const item = await findItemById(itemId);

        if (!item) {
            return {
                success: false,
                message: 'Item not found'
            };
        }

        return {
            success: true,
            message: 'Item retrieved successfully',
            data: item
        };
    } catch (error) {
        console.error('Get item by id error:', error);
        return {
            success: false,
            message: 'An error occurred while retrieving the item'
        };
    }
}

export const updateItemService = async (itemId: string, item: Partial<ItemWriteDto>, userId: string): Promise<{ success: boolean; message: string; data?: any }> => {
    try {
        if (!itemId) {
            return {
                success: false,
                message: 'Item ID is required'
            };
        }

        // Check ownership
        const existingItem = await findItemById(itemId);
        if (!existingItem) {
            return {
                success: false,
                message: 'Item not found'
            };
        }

        if (existingItem.userId !== userId) {
            return {
                success: false,
                message: 'You do not have permission to update this item'
            };
        }

        const updatedItem = await updateItem(itemId, item);

        return {
            success: true,
            message: 'Item updated successfully',
            data: updatedItem
        };
    } catch (error) {
        console.error('Update item error:', error);
        return {
            success: false,
            message: 'An error occurred while updating the item'
        };
    }
}

export const deleteItemService = async (itemId: string, userId: string): Promise<{ success: boolean; message: string }> => {
    try {
        if (!itemId) {
            return {
                success: false,
                message: 'Item ID is required'
            };
        }

        // Check ownership
        const existingItem = await findItemById(itemId);
        if (!existingItem) {
            return {
                success: false,
                message: 'Item not found'
            };
        }

        if (existingItem.userId !== userId) {
            return {
                success: false,
                message: 'You do not have permission to delete this item'
            };
        }

        await deleteItem(itemId);

        return {
            success: true,
            message: 'Item deleted successfully'
        };
    } catch (error) {
        console.error('Delete item error:', error);
        return {
            success: false,
            message: 'An error occurred while deleting the item'
        };
    }
}

