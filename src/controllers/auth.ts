import { NextFunction, Response } from 'express';
import { Req } from '../helpers/validate-jwt';
import { handleDeleteRedisSession } from '../utils/Redis/deleteRedis';
import { loginService, renewLoginService } from '../services/authService';

const login = async (req: Req, res: Response, next: NextFunction) => {
    try {
        const { usr, pas } = req.body;

        // Delegar la lógica de autenticación al servicio
        const { user, token } = await loginService(usr, pas);

        // Iniciar sesión
        if (!req.session) {
            return res.status(500).json({ error: 'Sesión no inicializada' });
        };

        // Guardar el usuario en la sesión
        (req.session as any).user = {
            idusrmob: user.idusrmob,
            usr: user.usr,
            pas: user.pas,
            svr: user.svr,
            dba: user.dba,
            port: user.port,
            usrdba: user.usrdba,
            pasdba: user.pasdba,
            empresa: user.empresa,
            razonsocial: user.razonsocial
        };

        return res.json({
            user,
            token
        });

    } catch (error: any) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message || 'Unexpected error' });
        return next(error);
    }
};

const renewLogin = async (req: Req, res: Response, next: NextFunction) => {
    try {
        const sessionId = req.sessionID;
        const { user, token } = await renewLoginService(sessionId);
        return res.json({ user, token });

    } catch (error: any) {
        console.error('Error in renewLogin:', error);

        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        };

        res.status(500).json({ error: error.message || 'Unexpected error' });
        return next(error);
    }
};

const logout = async (req: Req, res: Response, next: NextFunction) => {
    const sessionId = req.sessionID;
    try {
        await handleDeleteRedisSession({ sessionId });
        res.json({ ok: true });
    } catch (error: any) {
        res.status(500).send(error.message);
        return next(error);
    }
};

export {
    login,
    renewLogin,
    logout
};

