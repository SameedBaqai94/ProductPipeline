import { Router } from "express";
import { registerUserController, signInController } from "../controllers/UserController";

const router = Router();

router.post("/register", registerUserController);
router.post("/signin", signInController);

export default router;