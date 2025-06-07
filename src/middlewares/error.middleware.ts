import { Request, Response, NextFunction } from 'express';

export class CustomError extends Error {
    constructor(message: string, public statusCode: number) {
        super(message);
    }
}

export const errorHandler = (
    err: Error | CustomError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    let statusCode = 500;
    let message = 'Something went wrong';

    if (err instanceof CustomError) {
        statusCode = err.statusCode;
        message = err.message;
    } else if (err.name === 'ValidationError') {
        statusCode = 400;
        message = 'Validation failed';
    }

    res.status(statusCode).json({ error: message });
};