import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middlewares";
import { deleteUser, getMe } from "../controllers/user.controller";

const router = Router();

router.get("/me", authMiddleware, getMe);

router.delete("/:id", authMiddleware, deleteUser);

export default router;