"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.renewLogin = exports.login = void 0;
const getSession_1 = require("../utils/Redis/getSession");
const deleteRedis_1 = require("../utils/Redis/deleteRedis");
const authService_1 = require("../services/authService");
const login = async (req, res) => {
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
        return res.status(500).json({ error: error.message || 'Unexpected error' });
    }
};
exports.login = login;
const renewLogin = async (req, res) => {
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
        return res.status(500).json({ error: error.message || 'Unexpected error' });
    }
};
exports.renewLogin = renewLogin;
const logout = async (req, res) => {
    const sessionId = req.sessionID;
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        return res.status(400).json({ error: 'Sesion terminada' });
    }
    try {
        const { idusrmob, ...connection } = userFR;
        // Eliminar la sesión de Redis
        await (0, deleteRedis_1.handleDeleteRedisSession)({ sessionId });
        res.json({ ok: true });
    }
    catch (error) {
        console.error('Error en logout:', error);
        res.status(500).send(error.message);
    }
};
exports.logout = logout;
//# sourceMappingURL=auth.js.map