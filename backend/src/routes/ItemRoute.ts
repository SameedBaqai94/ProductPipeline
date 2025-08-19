import { Router } from "express";
import { addItemController, getAllItemController } from "../controllers/ItemController";

const router = Router();

router.post("/addItem", addItemController);
router.get("/all", getAllItemController);

export default router;