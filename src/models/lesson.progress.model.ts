import mongoose, { Schema, Document } from 'mongoose';

export interface ILessonProgress extends Document {
    _id: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    lesson: mongoose.Types.ObjectId;
    course: mongoose.Types.ObjectId;
    isCompleted: boolean;
    completedAt?: Date;
    startedAt: Date;
}

const LessonProgressSchema = new Schema<ILessonProgress>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    lesson: { type: Schema.Types.ObjectId, ref: 'Lesson', required: true },
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    isCompleted: { type: Boolean, default: false },
    completedAt: { type: Date },
    startedAt: { type: Date, default: Date.now }
});

export const LessonProgress = mongoose.model<ILessonProgress>('LessonProgress', LessonProgressSchema);