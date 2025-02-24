import { Response } from 'express';
import { User } from "../models/user";
import { UserService } from '../services/user.services';
import RequestWithUser from '../types/user.request.type';

export const getUser = async (req: RequestWithUser, res: Response) => {
    if (!req.user) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
    }

    res.json(user);
};

export const deleteUser = async (req: RequestWithUser, res: Response) => {
    try {
        const { id } = req.params;

        if (!req.user) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        if (req.user.id !== id) {
            res.status(403).json({ error: "You can only delete your own account" });
            return;
        }

        const deleted = await UserService.deleteUser(id);
        if (!deleted) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        res.json({ message: "User deleted" });
    } catch (error) {
        res.status(500).json({ error: "Server error: " + { error } });
    }
};