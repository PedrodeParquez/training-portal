import { Request, Response, NextFunction } from 'express';
import { CommentService } from '../services/comment.service';
import { CustomError } from '../middlewares/error.middleware';

export const createComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const comment = await CommentService.createComment(req.body);
        res.status(201).json({ message: 'Comment created', comment });
    } catch (error) {
        next(error);
    }
};

export const getCommentById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const comment = await CommentService.findCommentById(req.params.id);
        if (!comment) {
            throw new CustomError('Comment not found', 404);
        }
        res.json(comment);
    } catch (error) {
        next(error);
    }
};

export const getCommentsByLesson = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const comments = await CommentService.findCommentsByLesson(req.params.lessonId);
        res.json(comments);
    } catch (error) {
        next(error);
    }
};

export const updateComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const updatedComment = await CommentService.updateComment(req.params.id, req.body.text);
        if (!updatedComment) {
            throw new CustomError('Comment not found', 404);
        }
        res.json({ message: 'Comment updated', comment: updatedComment });
    } catch (error) {
        next(error);
    }
};

export const deleteComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const deletedComment = await CommentService.deleteComment(req.params.id);
        if (!deletedComment) {
            throw new CustomError('Comment not found', 404);
        }
        res.json({ message: 'Comment deleted', comment: deletedComment });
    } catch (error) {
        next(error);
    }
};