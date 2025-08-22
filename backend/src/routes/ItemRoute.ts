import { Router } from "express";
import { addItemController, getAllItemController, getItemsByUserController } from "../controllers/ItemController";
import { verifyToken } from "../middleware/authMiddleware";

const router = Router();

router.post("/addItem", verifyToken, addItemController);
router.get("/all", verifyToken, getAllItemController);
router.get("/itemsByUser", verifyToken, getItemsByUserController)

export default router;