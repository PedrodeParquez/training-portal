import express from 'express';
import createServer from './config/express';
import { connectDB } from './config/database';
import { ENV } from './config/env';
import { notFoundMiddleware } from './middlewares/notFound.middleware';

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import courseRoutes from './routes/course.routes';
import tagRoutes from './routes/tag.routes';
import storageRoutes from './routes/storage.routes';
import lessonRoutes from './routes/lesson.routes';
import commentRoutes from './routes/comment.routes';
import enrollmentRoutes from './routes/enrollment.routes';

const app = createServer();

connectDB();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/storage', storageRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/enrollments', enrollmentRoutes);

app.use(notFoundMiddleware);

app.listen(ENV.PORT, () => {
	console.log(`Server running on http://localhost:${ENV.PORT}`);
});