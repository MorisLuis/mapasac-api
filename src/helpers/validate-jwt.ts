// helpers/validate-jwt.ts
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { AppError, UnauthorizedError } from '../errors/CustomError';
import redisClient from '../config/redisClient';
import { UserSessionInterface } from '../interface/user';

// Middleware to validate JWT from first login. (App)
const validateJWT = async (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) {
        return next(new UnauthorizedError('Acceso denegado. Falta token o es invalido'));
    }


    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload;
        const sessionId = decoded.sessionId;
        req.sessionId = sessionId;

        const sessionDataRaw = await redisClient.get(`session:${sessionId}`);
        const sessionData = sessionDataRaw ?? null;

        if (!sessionData) {
            return next(new UnauthorizedError('Sesión no válida'));
        };

        try {
            const session: UserSessionInterface = JSON.parse(sessionData);

            req.session = session;

            return next();
        } catch (error) {
            return next(new AppError(`Error parsing session data ${error}`));
        }


    } catch (err) {
        return res.status(500).json({ success: false, message: 'Failed to authenticate token' });
    }
};

export {
    validateJWT
}
