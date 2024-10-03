"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renewLoginService = exports.loginService = void 0;
const querys_1 = require("../querys/querys");
const connection_1 = require("../database/connection");
const generate_jwt_1 = require("../helpers/generate-jwt");
const getSession_1 = require("../utils/Redis/getSession");
const loginService = async (usr, pas) => {
    const pool = await (0, connection_1.dbConnectionInitial)();
    if (!pool) {
        throw new Error('No se pudo establecer la conexión con la base de datos');
    }
    try {
        // Validar que el usuario no esté vacío
        if (usr.trim() === "" || pas.trim() === "") {
            throw new Error('Necesario escribir usuario y contraseña');
        }
        const userName = usr.toUpperCase();
        const result = await pool.query(querys_1.querys.auth, [userName]);
        const user = result.rows[0];
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        // Validar contraseña
        if (user.pas.trim() !== pas) {
            throw new Error('Contraseña incorrecta');
        }
        // Generar JWT
        const token = await (0, generate_jwt_1.generateJWT)({
            idusrmob: user.idusrmob,
        });
        return { user, token };
    }
    catch (error) {
        throw error;
    }
    finally {
        await pool.end();
        await (0, connection_1.closeGlobalPool)();
    }
};
exports.loginService = loginService;
const renewLoginService = async (sessionId) => {
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        throw new Error('Sesion terminada');
    }
    const { idusrmob } = userFR;
    // Establecer la conexión con la base de datos
    const pool = await (0, connection_1.dbConnectionInitial)();
    if (!idusrmob) {
        throw new Error('No se pudo establecer la conexión con el usuario');
    }
    try {
        // Consultar el usuario en la base de datos por ID
        const result = await pool.query(querys_1.querys.getUserById, [idusrmob]);
        const user = result.rows[0];
        // Generar un nuevo token JWT
        const token = await (0, generate_jwt_1.generateJWT)({ idusrmob });
        return { user, token };
    }
    catch (error) {
        throw error;
    }
    finally {
        await pool.end();
    }
};
exports.renewLoginService = renewLoginService;
//# sourceMappingURL=authService.js.map