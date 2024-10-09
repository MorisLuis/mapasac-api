"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.renewLogin = exports.login = void 0;
const deleteRedis_1 = require("../utils/Redis/deleteRedis");
const authService_1 = require("../services/authService");
const login = async (req, res, next) => {
    try {
        const { usr, pas } = req.body;
        // Delegar la lógica de autenticación al servicio
        const { user, token } = await (0, authService_1.loginService)(usr, pas);
        // Iniciar sesión
        if (!req.session) {
            return res.status(500).json({ error: 'Sesión no inicializada' });
        }
        ;
        // Guardar el usuario en la sesión
        req.session.user = {
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
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message || 'Unexpected error' });
        return next(error);
    }
};
exports.login = login;
const renewLogin = async (req, res, next) => {
    try {
        const sessionId = req.sessionID;
        const { user, token } = await (0, authService_1.renewLoginService)(sessionId);
        return res.json({ user, token });
    }
    catch (error) {
        console.error('Error in renewLogin:', error);
        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        }
        ;
        res.status(500).json({ error: error.message || 'Unexpected error' });
        return next(error);
    }
};
exports.renewLogin = renewLogin;
const logout = async (req, res, next) => {
    const sessionId = req.sessionID;
    try {
        await (0, deleteRedis_1.handleDeleteRedisSession)({ sessionId });
        res.json({ ok: true });
    }
    catch (error) {
        res.status(500).send(error.message);
        return next(error);
    }
};
exports.logout = logout;
//# sourceMappingURL=auth.js.map