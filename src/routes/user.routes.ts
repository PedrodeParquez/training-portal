import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middlewares";
import { deleteUser, getUser } from "../controllers/user.controller";

const router = Router();

router.get("/getUser", authMiddleware, getUser);

router.delete("/:id", authMiddleware, deleteUser);

export default router;