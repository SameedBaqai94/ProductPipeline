import { Router, Request, Response } from "express";
import { verifyToken } from "../mics/tokenAuth.js";
import {
    createItemController,
    getAllItemsController,
    getItemByIdController,
    updateItemController,
    deleteItemController
} from "../controllers/ItemController.js";

const router = Router();

// Create item - requires authentication
router.post("/", verifyToken, createItemController);

// Get all items
router.get("/", verifyToken, getAllItemsController);

// Get item by ID
router.get("/:id", verifyToken, getItemByIdController);

// Update item - requires authentication
router.put("/:id", verifyToken, updateItemController);

// Delete item - requires authentication
router.delete("/:id", verifyToken, deleteItemController);

export default router;
