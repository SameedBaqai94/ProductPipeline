import { Router } from "express";
import { userRegisterController, userSignInController } from "../controller/UsersController.js";

const router = Router();

router.post("/signin", userSignInController);
router.post("/register", userRegisterController);

export default router;