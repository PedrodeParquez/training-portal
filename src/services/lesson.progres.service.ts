import { LessonProgress } from '../models/lesson.progress.model';
import { Lesson } from '../models/lesson.model';
import { EnrollmentService } from './enrollment.service';
import { CustomError } from '../middlewares/error.middleware';

export class LessonProgressService {

    static async markLessonAsCompleted(userId: string, lessonId: string) {
        const lesson = await Lesson.findById(lessonId);
        if (!lesson) {
            throw new CustomError('Lesson not found', 404);
        }

        const isEnrolled = await EnrollmentService.isUserEnrolled(userId, lesson.course.toString());
        if (!isEnrolled) {
            throw new CustomError('User is not enrolled to this course', 403);
        }

        const lessonProgress = await LessonProgress.findOneAndUpdate(
            { user: userId, lesson: lessonId },
            {
                user: userId,
                lesson: lessonId,
                course: lesson.course,
                isCompleted: true,
                completedAt: new Date()
            },
            {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true
            }
        );

        await EnrollmentService.updateCourseProgress(userId, lesson.course.toString());

        return lessonProgress;
    }

    static async markLessonAsIncomplete(userId: string, lessonId: string) {
        const lesson = await Lesson.findById(lessonId);
        if (!lesson) {
            throw new CustomError('Lesson not found', 404);
        }

        const isEnrolled = await EnrollmentService.isUserEnrolled(userId, lesson.course.toString());
        if (!isEnrolled) {
            throw new CustomError('User is not enrolled to this course', 403);
        }

        const lessonProgress = await LessonProgress.findOneAndUpdate(
            { user: userId, lesson: lessonId },
            {
                isCompleted: false,
                completedAt: undefined
            },
            { new: true }
        );

        if (!lessonProgress) {
            throw new CustomError('Lesson progress not found', 404);
        }

        await EnrollmentService.updateCourseProgress(userId, lesson.course.toString());

        return lessonProgress;
    }

    static async startLesson(userId: string, lessonId: string) {
        const lesson = await Lesson.findById(lessonId);
        if (!lesson) {
            throw new CustomError('Lesson not found', 404);
        }

        const isEnrolled = await EnrollmentService.isUserEnrolled(userId, lesson.course.toString());
        if (!isEnrolled) {
            throw new CustomError('User is not enrolled to this course', 403);
        }

        const lessonProgress = await LessonProgress.findOneAndUpdate(
            { user: userId, lesson: lessonId },
            {
                user: userId,
                lesson: lessonId,
                course: lesson.course,
                startedAt: new Date()
            },
            {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true
            }
        );

        return lessonProgress;
    }
}