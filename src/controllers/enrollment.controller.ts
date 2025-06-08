import { Response, NextFunction } from 'express';
import { EnrollmentService } from '../services/enrollment.service';
import { LessonProgressService } from '../services/lesson.progres.service';
import { CustomError } from '../middlewares/error.middleware';
import RequestWithUser from '../types/user.request.type';

export const enrollToCourse = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.user) {
            throw new CustomError('Unauthorized', 401);
        }

        const { courseId } = req.body;

        if (!courseId) {
            throw new CustomError('Course ID is required', 400);
        }

        const enrollment = await EnrollmentService.enrollUserToCourse(req.user.id, courseId);
        res.status(201).json({
            message: 'Successfully enrolled to course',
            enrollment
        });
    } catch (error) {
        next(error);
    }
};

export const unenrollFromCourse = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.user) {
            throw new CustomError('Unauthorized', 401);
        }

        const { courseId } = req.params;

        const enrollment = await EnrollmentService.unenrollUserFromCourse(req.user.id, courseId);
        res.json({
            message: 'Successfully unenrolled from course',
            enrollment
        });
    } catch (error) {
        next(error);
    }
};

export const getMyEnrollments = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.user) {
            throw new CustomError('Unauthorized', 401);
        }

        const enrollments = await EnrollmentService.getUserEnrollments(req.user.id);
        res.json(enrollments);
    } catch (error) {
        next(error);
    }
};

export const getCourseEnrollmentCount = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { courseId } = req.params;

        const count = await EnrollmentService.getCourseEnrollmentCount(courseId);
        res.json({ courseId, enrollmentCount: count });
    } catch (error) {
        next(error);
    }
};

export const markLessonCompleted = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.user) {
            throw new CustomError('Unauthorized', 401);
        }

        const { lessonId } = req.params;

        const progress = await LessonProgressService.markLessonAsCompleted(req.user.id, lessonId);
        res.json({
            message: 'Lesson marked as completed',
            progress
        });
    } catch (error) {
        next(error);
    }
};

export const markLessonIncomplete = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.user) {
            throw new CustomError('Unauthorized', 401);
        }

        const { lessonId } = req.params;

        const progress = await LessonProgressService.markLessonAsIncomplete(req.user.id, lessonId);
        res.json({
            message: 'Lesson marked as incomplete',
            progress
        });
    } catch (error) {
        next(error);
    }
};

export const startLesson = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.user) {
            throw new CustomError('Unauthorized', 401);
        }

        const { lessonId } = req.params;

        const progress = await LessonProgressService.startLesson(req.user.id, lessonId);
        res.json({
            message: 'Lesson started',
            progress
        });
    } catch (error) {
        next(error);
    }
};