import { Router } from "express";
import { itemsAddController, itemsDeleteController, itemsGetByIdController, itemsListAllController, itemsUpdateController } from "../controller/ItemsController.js";
import { verifyToken } from "../util/jwtVerify.js";

const router = Router();

router.post("/addItem", verifyToken, itemsAddController);
router.get("/allItems", verifyToken, itemsListAllController);
router.get("/itemById", verifyToken, itemsGetByIdController);
router.put("/itemUpdate", verifyToken, itemsUpdateController);
router.delete('/itemDelete', verifyToken, itemsDeleteController);

export default router;