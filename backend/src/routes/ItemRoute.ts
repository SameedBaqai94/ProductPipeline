import { Router } from "express";
import { addItemController, getAllItemController, getItemsByUserController } from "../controllers/ItemController";

const router = Router();

router.post("/addItem", addItemController);
router.get("/all", getAllItemController);
router.get("/:userId", getItemsByUserController)

export default router;