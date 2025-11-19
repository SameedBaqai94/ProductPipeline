import { Router } from "express";
import { userRegisterController, userSignInController } from "../controllers/UserController.js";

const router = Router();

router.post("/register", userRegisterController);
router.post("/signin", userSignInController);


export default router;