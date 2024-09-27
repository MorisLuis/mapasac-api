"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModules = exports.logout = exports.renewLogin = exports.login = void 0;
const connection_1 = require("../database/connection");
const querys_1 = require("../querys/querys");
const generate_jwt_1 = require("../helpers/generate-jwt");
const getSession_1 = require("../utils/Redis/getSession");
const deleteRedis_1 = require("../utils/Redis/deleteRedis");
const login = async (req, res) => {
    const pool = await (0, connection_1.dbConnectionInitial)();
    if (!pool) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
        return;
    }
    ;
    try {
        const { usr, pas } = req.body;
        if (usr.trim() === "" || pas.trim() === "") {
            return res.status(400).json({ error: 'Necesario escribir usuario y contraseña' });
        }
        const userName = usr.toUpperCase();
        const result = await pool.query(querys_1.querys.auth, [userName]);
        const user = result.rows[0];
        if (!user) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }
        if (!req.session) {
            return res.status(500).json({ error: 'Sesión no inicializada' });
        }
        req.session.user = {
            idusrmob: user?.idusrmob,
            usr: user?.usr,
            pas: user?.pas,
            svr: user?.svr,
            dba: user?.dba,
            port: user?.port,
            usrdba: user?.usrdba,
            pasdba: user?.pasdba,
            empresa: user?.empresa,
            razonsocial: user?.razonsocial
        };
        if (user.pas.trim() !== pas) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }
        const token = await (0, generate_jwt_1.generateJWT)({
            idusrmob: user.idusrmob,
        });
        res.json({
            user,
            token
        });
    }
    catch (error) {
        console.log({ error });
        return res.status(500).json({ error: error.message || 'Unexpected error' });
    }
    finally {
        await pool.end();
        await (0, connection_1.closeGlobalPool)();
    }
};
exports.login = login;
const renewLogin = async (req, res) => {
    // Get session from REDIS.
    const sessionId = req.sessionID;
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        return res.status(401).json({ error: 'Sesion terminada' });
    }
    const { idusrmob } = userFR;
    const pool = await (0, connection_1.dbConnectionInitial)();
    if (!idusrmob) {
        return res.status(400).json({ error: 'No se pudo establecer la conexión con el usuario' });
    }
    try {
        const result = await pool.query(querys_1.querys.getUserById, [idusrmob]);
        const user = result.rows[0];
        const token = await (0, generate_jwt_1.generateJWT)({ idusrmob });
        res.json({ user, token });
    }
    catch (error) {
        console.error('Error in renewLogin:', error);
        res.status(500).send(error.message);
    }
    finally {
        await pool.end();
    }
};
exports.renewLogin = renewLogin;
const logout = async (req, res) => {
    const sessionId = req.sessionID;
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        return res.status(401).json({ error: 'Sesion terminada' });
    }
    if (!sessionId) {
        return res.status(401).json({ error: 'Sesion terminada' });
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await (0, connection_1.getGlobalPool)(connection);
    console.log({ pool });
    try {
        // Eliminar la sesión de Redis
        await (0, deleteRedis_1.handleDeleteRedisSession)({ sessionId });
        // Cerrar el pool de conexiones de PostgreSQL
        //await pool.end();
        res.json({ ok: true });
    }
    catch (error) {
        console.error('Error en logout:', error);
        res.status(500).send(error.message);
    }
};
exports.logout = logout;
const getModules = async (req, res) => {
    const idusrmob = req.idusrmob;
    if (!idusrmob) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
        return;
    }
    ;
    const pool = await (0, connection_1.dbConnectionInitial)();
    try {
        const result = await pool.query(querys_1.querys.getModules, [idusrmob]);
        const modules = result.rows;
        res.json({
            modules
        });
    }
    catch (error) {
        console.log({ error });
        res.status(500).send(error.message);
    }
    finally {
        await pool.end();
    }
};
exports.getModules = getModules;
//# sourceMappingURL=auth.js.map