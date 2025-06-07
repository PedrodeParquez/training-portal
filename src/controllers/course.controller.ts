import { Request, Response, NextFunction } from 'express';
import { CourseService } from '../services/course.service';
import mongoose from 'mongoose';
import { CustomError } from '../middlewares/error.middleware';

interface CourseFilters {
    title?: string;
    level?: string;
    isPublished?: boolean;
    authorId?: mongoose.Types.ObjectId;
    categoryId?: mongoose.Types.ObjectId;
    minPrice?: number;
    maxPrice?: number;
    startDate?: Date;
    endDate?: Date;
}

interface PaginationOptions {
    page: number;
    limit: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
}

export const createCourse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const course = await CourseService.createCourse(req.body);
        res.status(201).json({ message: 'Course created', course });
    } catch (error) {
        next(error);
    }
};

export const getCourseBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const course = await CourseService.findCourseBySlug(req.params.slug);
        if (!course) {
            throw new CustomError('Course not found', 404);
        }
        res.json(course);
    } catch (error) {
        next(error);
    }
};

export const getCourseById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const course = await CourseService.findCourseById(req.params.id);
        if (!course) {
            throw new CustomError('Course not found', 404);
        }
        res.json(course);
    } catch (error) {
        next(error);
    }
};

export const getAllCourses = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const courses = await CourseService.findAllCourses();
        res.json(courses);
    } catch (error) {
        next(error);
    }
};

export const getFilteredCourses = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const page = req.query.page ? parseInt(req.query.page as string) : 1;
        const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
        const sortBy = (req.query.sortBy as string) || 'createdAt';
        const sortOrder = (req.query.sortOrder as 'asc' | 'desc') || 'desc';

        const filters: CourseFilters = {};

        if (req.query.title) filters.title = req.query.title as string;
        if (req.query.level) filters.level = req.query.level as string;
        if (req.query.isPublished !== undefined) filters.isPublished = req.query.isPublished === 'true';

        if (req.query.authorId) {
            filters.authorId = new mongoose.Types.ObjectId(req.query.authorId as string);
        }

        if (req.query.categoryId) {
            filters.categoryId = new mongoose.Types.ObjectId(req.query.categoryId as string);
        }

        if (req.query.minPrice) {
            filters.minPrice = parseFloat(req.query.minPrice as string);
        }

        if (req.query.maxPrice) {
            filters.maxPrice = parseFloat(req.query.maxPrice as string);
        }

        if (req.query.startDate) {
            filters.startDate = new Date(req.query.startDate as string);
        }

        if (req.query.endDate) {
            filters.endDate = new Date(req.query.endDate as string);
        }

        const paginationOptions: PaginationOptions = { page, limit, sortBy, sortOrder };
        const result = await CourseService.findCourses(filters, paginationOptions);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const updateCourse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const updatedCourse = await CourseService.updateCourse(req.params.id, req.body);
        if (!updatedCourse) {
            throw new CustomError('Course not found', 404);
        }
        res.json({ message: 'Course updated', course: updatedCourse });
    } catch (error) {
        next(error);
    }
};

export const deleteCourse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const deletedCourse = await CourseService.deleteCourse(req.params.id);
        if (!deletedCourse) {
            throw new CustomError('Course not found', 404);
        }
        res.json({ message: 'Course deleted', course: deletedCourse });
    } catch (error) {
        next(error);
    }
};