import { Router } from 'express';
import {
    createCourse,
    getCourseBySlug,
    getCourseById,
    getAllCourses,
    getFilteredCourses,
    updateCourse,
    deleteCourse,
} from '../controllers/course.controller';

const router = Router();

router.post('/', createCourse);

router.get('/', getFilteredCourses);

router.get('/', getAllCourses);

router.get('/id/:id', getCourseById);

router.get('/:slug', getCourseBySlug);

router.put('/:id', updateCourse);

router.delete('/:id', deleteCourse);

export default router;