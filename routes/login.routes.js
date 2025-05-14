import { Router } from "express";
import loginController from "../controllers/login.js";

const router = Router();

router.post("/register", loginController.register);
router.post("/login", loginController.login);
router.post("/logout", loginController.logout);

export default router;
