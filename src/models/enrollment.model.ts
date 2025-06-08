import mongoose, { Schema, Document } from 'mongoose';

export interface IEnrollment extends Document {
    _id: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    course: mongoose.Types.ObjectId;
    enrolledAt: Date;
    completedAt?: Date;
    isActive: boolean;
    progress: number;
}

const EnrollmentSchema = new Schema<IEnrollment>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    enrolledAt: { type: Date, default: Date.now },
    completedAt: { type: Date },
    isActive: { type: Boolean, default: true },
    progress: { type: Number, default: 0, min: 0, max: 100 }
});

export const Enrollment = mongoose.model<IEnrollment>('Enrollment', EnrollmentSchema);