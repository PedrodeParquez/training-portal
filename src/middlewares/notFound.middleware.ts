import { Request, Response } from 'express';

export const notFoundMiddleware = (req: Request, res: Response) => {
    res.status(404).json({
        error: 'Method not found',
        path: req.originalUrl,
        method: req.method
    });
};