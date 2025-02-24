import express from 'express';
import createServer from './config/express';
import { connectDB } from './config/database';
import { ENV } from './config/env';

import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';

const app = createServer();

connectDB();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);


app.use((req, res) => {
	res.status(404).json({ error: 'Method not found' });
});

app.listen(ENV.PORT, () => {
	console.log(`Server running on http://localhost:${ENV.PORT}`);
});