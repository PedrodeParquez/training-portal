import { Router } from 'express';
import {
    enrollToCourse,
    unenrollFromCourse,
    getMyEnrollments,
    getCourseEnrollmentCount,
    markLessonCompleted,
    markLessonIncomplete,
    startLesson,
} from '../controllers/enrollment.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post('/enroll', authMiddleware, enrollToCourse);

router.delete('/unenroll/:courseId', authMiddleware, unenrollFromCourse);

router.get('/my-enrollments', authMiddleware, getMyEnrollments);

router.get('/course/:courseId/count', getCourseEnrollmentCount);

router.post('/lesson/:lessonId/complete', authMiddleware, markLessonCompleted);

router.post('/lesson/:lessonId/incomplete', authMiddleware, markLessonIncomplete);

router.post('/lesson/:lessonId/start', authMiddleware, startLesson);

export default router;