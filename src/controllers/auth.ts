import { Response } from 'express';
import { dbConnectionInitial, getGlobalPool } from "../database/connection";
import { querys } from '../querys/querys';
import { generateJWT } from '../helpers/generate-jwt';
import { Req } from '../helpers/validate-jwt';
import { handleGetSession } from '../utils/Redis/getSession';
import { handleDeleteRedisSession } from '../utils/Redis/deleteRedis';
import { loginService, renewLoginService } from '../services/authService';

const login = async (req: Req, res: Response) => {
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
        return res.status(500).json({ error: error.message || 'Unexpected error' });
    }
};

const renewLogin = async (req: Req, res: Response) => {
    try {
        const sessionId = req.sessionID;
        const { user, token } = await renewLoginService(sessionId);
        return res.json({ user, token });

    } catch (error: any) {
        console.error('Error in renewLogin:', error);

        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        };

        return res.status(500).json({ error: error.message || 'Unexpected error' });
    }
};

const logout = async (req: Req, res: Response) => {
    const sessionId = req.sessionID;
    const { user: userFR } = await handleGetSession({ sessionId });
    if (!userFR) {
        return res.status(400).json({ error: 'Sesion terminada' });
    }
    try {
        const { idusrmob, ...connection } = userFR;
        // Eliminar la sesión de Redis
        await handleDeleteRedisSession({ sessionId });
        res.json({ ok: true });
    } catch (error: any) {
        console.error('Error en logout:', error);
        res.status(500).send(error.message);
    }
};

export {
    login,
    renewLogin,
    logout
};

