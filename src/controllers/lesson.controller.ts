import { Request, Response, NextFunction } from 'express';
import { LessonService } from '../services/lesson.service';
import { CustomError } from '../middlewares/error.middleware';

export const createLesson = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const lesson = await LessonService.createLesson(req.body);
        res.status(201).json({ message: 'Lesson created', lesson });
    } catch (error) {
        next(error);
    }
};

export const getLessonById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const lesson = await LessonService.findLessonById(req.params.id);
        if (!lesson) {
            throw new CustomError('Lesson not found', 404);
        }
        res.json(lesson);
    } catch (error) {
        next(error);
    }
};

export const getLessonsByCourse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const lessons = await LessonService.findLessonsByCourse(req.params.courseId);
        res.json(lessons);
    } catch (error) {
        next(error);
    }
};

export const getAllLessons = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const lessons = await LessonService.findAllLessons();
        res.json(lessons);
    } catch (error) {
        next(error);
    }
};

export const updateLesson = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const updatedLesson = await LessonService.updateLesson(req.params.id, req.body);
        if (!updatedLesson) {
            throw new CustomError('Lesson not found', 404);
        }
        res.json({ message: 'Lesson updated', lesson: updatedLesson });
    } catch (error) {
        next(error);
    }
};

export const deleteLesson = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const deletedLesson = await LessonService.deleteLesson(req.params.id);
        if (!deletedLesson) {
            throw new CustomError('Lesson not found', 404);
        }
        res.json({ message: 'Lesson deleted', lesson: deletedLesson });
    } catch (error) {
        next(error);
    }
};