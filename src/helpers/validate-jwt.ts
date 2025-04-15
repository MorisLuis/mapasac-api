import type { NextFunction, Request, Response } from 'express';
import type { JwtPayload } from 'jsonwebtoken';
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { AppError, ForbiddenError, UnauthorizedError } from '../errors/CustomError';
import redisClient from '../config/redisClient';
import type { UserSessionInterface } from '../interface/user';

const validateJWT = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) {
        return next(new UnauthorizedError('Acceso denegado. Falta token o es inválido'));
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload;
        const sessionId = decoded.sessionId;
        req.sessionId = sessionId;

        if (!sessionId) {
            return next(new UnauthorizedError('Acceso denegado. Token inválido'));
        }

        const sessionDataRaw = await redisClient.get(`session:${sessionId}`);
        if (!sessionDataRaw) {
            return next(new UnauthorizedError('Sesión no válida'));
        }

        let session: UserSessionInterface;
        try {
            session = JSON.parse(sessionDataRaw);
        } catch (parseError) {
            return next(new AppError(`Error al procesar datos de sesión: ${parseError}`));
        }

        req.session = session;
        return next();

    } catch (error) {
        switch (true) {
            case error instanceof TokenExpiredError:
                return next(new UnauthorizedError('El token ha expirado, por favor, inicia sesión nuevamente'));

            case error instanceof JsonWebTokenError:
                return next(new UnauthorizedError('Token inválido, por favor verifica tus credenciales'));

            case error instanceof Error:
                return next(new UnauthorizedError(`Fallo al autenticar el token: ${error.message}`));

            default:
                return next(new UnauthorizedError('Fallo desconocido al autenticar el token'));
        }
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
        switch (true) {
            case error instanceof TokenExpiredError:
                return next(new UnauthorizedError('El token ha expirado, por favor, inicia sesión nuevamente'));

            case error instanceof JsonWebTokenError:
                return next(new UnauthorizedError('Token inválido, por favor verifica tus credenciales'));

            case error instanceof Error:
                return next(new UnauthorizedError(`Fallo al autenticar el token: ${error.message}`));

            default:
                return next(new UnauthorizedError('Fallo desconocido al autenticar el token'));
        }
    }
};

export {
    validateJWT,
    validateRefreshJWT
}
