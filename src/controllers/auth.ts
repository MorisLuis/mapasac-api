import type { NextFunction, Request, Response } from 'express';
import { loginService } from '../services/authService';
import { generateRedisSession, handleDeleteRedisSession } from '../helpers/generate-redis';
import { generateAccessToken, generateRefreshToken } from '../helpers/generate-jwt';
import { UnauthorizedError } from '../errors/CustomError';
import type { UserSessionInterface } from '../interface/user';

const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { usr, pas } = req.body;
        const { user, token, refreshToken } = await loginService(usr, pas);
        res.json({
            user,
            token,
            refreshToken
        })

    } catch (error) {
        return next(error);
    }
};

const refresh = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {
        const session = req.session;
        const sessionId = req.sessionId;
        const refreshToken = req.body.refreshToken;

        if (!refreshToken) {
            throw new UnauthorizedError("No hay refresh token")
        }

        // Guardar la sesión en Redis con expiración (1 hora)
        await generateRedisSession(sessionId, session)

        // Generar el token JWT que incluye el sessionId
        const newToken = generateAccessToken(sessionId)
        const newRefreshToken = generateRefreshToken(sessionId);

        const response: { user: UserSessionInterface, token: string, refreshToken: string } = { user: session, token: newToken, refreshToken: newRefreshToken };
        res.json(response);

    } catch (error) {
        return next(error);
    }
};
const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const sessionId = req.sessionId;
        if (!sessionId) throw new UnauthorizedError('Sesión terminada');

        await handleDeleteRedisSession(sessionId);

        res.json({ ok: true });
    } catch (error) {
        next(error);
    }
};

export {
    login,
    refresh,
    logout
};

