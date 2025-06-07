import { Request, Response, NextFunction } from 'express';
import { TagService } from '../services/tag.service';

export const createTag = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const tag = await TagService.createTag(req.body);
        res.status(201).json({ message: 'Tag created', tag });
    } catch (error) {
        next(error);
    }
};