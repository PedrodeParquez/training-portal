import { Enrollment } from '../models/enrollment.model';
import { LessonProgress } from '../models/lesson.progress.model';
import { Course } from '../models/course.model';
import { Lesson } from '../models/lesson.model';
import { CustomError } from '../middlewares/error.middleware';

export class EnrollmentService {

    static async enrollUserToCourse(userId: string, courseId: string) {
        const course = await Course.findById(courseId);
        if (!course) {
            throw new CustomError('Course not found', 404);
        }

        if (!course.isPublished) {
            throw new CustomError('Course is not available for enrollment', 400);
        }

        const existingEnrollment = await Enrollment.findOne({ user: userId, course: courseId });
        if (existingEnrollment) {
            throw new CustomError('User is already enrolled to this course', 409);
        }

        const enrollment = new Enrollment({
            user: userId,
            course: courseId
        });

        return await enrollment.save();
    }

    static async unenrollUserFromCourse(userId: string, courseId: string) {
        const enrollment = await Enrollment.findOneAndUpdate(
            { user: userId, course: courseId },
            { isActive: false },
            { new: true }
        );

        if (!enrollment) {
            throw new CustomError('Enrollment not found', 404);
        }

        await LessonProgress.deleteMany({ user: userId, course: courseId });

        return enrollment;
    }

    static async getUserEnrollments(userId: string) {
        return await Enrollment.find({ user: userId, isActive: true })
            .populate('course', 'title slug description imageUrl level price')
            .sort({ enrolledAt: -1 });
    }

    static async getCourseEnrollmentCount(courseId: string) {
        return await Enrollment.countDocuments({ course: courseId, isActive: true });
    }

    static async isUserEnrolled(userId: string, courseId: string) {
        const enrollment = await Enrollment.findOne({
            user: userId,
            course: courseId,
            isActive: true
        });
        return !!enrollment;
    }

    static async updateCourseProgress(userId: string, courseId: string) {
        const totalLessons = await Lesson.countDocuments({ course: courseId });

        if (totalLessons === 0) {
            return await Enrollment.findOneAndUpdate(
                { user: userId, course: courseId },
                { progress: 0 },
                { new: true }
            );
        }

        const completedLessons = await LessonProgress.countDocuments({
            user: userId,
            course: courseId,
            isCompleted: true
        });

        const progress = Math.round((completedLessons / totalLessons) * 100);

        const enrollment = await Enrollment.findOneAndUpdate(
            { user: userId, course: courseId },
            {
                progress,
                ...(progress === 100 && { completedAt: new Date() })
            },
            { new: true }
        );

        return enrollment;
    }
}