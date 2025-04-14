import type { NextFunction, Request, Response } from 'express';
import type { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import { AppError, ForbiddenError, UnauthorizedError } from '../errors/CustomError';
import redisClient from '../config/redisClient';
import type { UserSessionInterface } from '../interface/user';

const validateJWT = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {

    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) {
        return next(new UnauthorizedError('Acceso denegado. Falta token o es invalido'));
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload;
        const sessionId = decoded.sessionId;
        req.sessionId = sessionId;

        if (!sessionId) {
            next(new UnauthorizedError('Acceso denegado. Falta token o es invalido'))
            return
        }

        const sessionDataRaw = await redisClient.get(`session:${sessionId}`);
        const sessionData = sessionDataRaw ?? null;

        if (!sessionData) {
            next(new UnauthorizedError('Sesión no válida'));
            return;
        };

        try {
            const session: UserSessionInterface = JSON.parse(sessionData);
            req.session = session;

            return next();
        } catch (error) {
            return next(new AppError(`Error parsing session data ${error}`));
        }


    } catch (error) {
        next(new AppError(`Fallo al autenticar el token: ${error}`))
    }
};

const validateRefreshJWT = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {

    // Obtener el refreshToken del body
    const refreshToken = req.body.refreshToken;

    if (!refreshToken) {
        return next(new ForbiddenError('Token inválido o expirado'));
    }

    try {
        // Verificar el refreshToken usando la clave secreta específica para el refreshToken
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as JwtPayload;
        const sessionId = decoded.sessionId;
        req.sessionId = sessionId;

        // Buscar la sesión en Redis usando el sessionId
        const sessionDataRaw = await redisClient.get(`session:${sessionId}`);
        const sessionData = sessionDataRaw ?? null;

        if (!sessionData) {
            return next(new ForbiddenError('Sesion terminada'));
        }

        try {
            // Parsear los datos de la sesión obtenida de Redis
            const session: UserSessionInterface = JSON.parse(sessionData);

            // Guardar la sesión en la solicitud para el uso posterior
            req.session = session;

            // Pasar al siguiente middleware
            return next();
        } catch (error) {
            return next(new AppError(`Error parsing session data: ${error}`));
        }

    } catch (error) {
        next(new ForbiddenError(`Token expirado o inválido: ${error}`));
    }
};

export {
    validateJWT,
    validateRefreshJWT
}
