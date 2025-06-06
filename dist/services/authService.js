"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginService = void 0;
const querys_1 = require("../querys/querys");
const connection_1 = require("../database/connection");
const CustomError_1 = require("../errors/CustomError");
const uuid_1 = require("uuid");
const generate_jwt_1 = require("../helpers/generate-jwt");
const generate_redis_1 = require("../helpers/generate-redis");
const loginService = async (usr, pas) => {
    const pool = await (0, connection_1.dbConnectionInitial)();
    if (!pool) {
        throw new CustomError_1.ValidationError('No se pudo establecer la conexión con la base de datos');
    }
    // Validar que el usuario no esté vacío
    if (usr.trim() === "" || pas.trim() === "") {
        throw new CustomError_1.ValidationError('Necesario escribir usuario y contraseña');
    }
    const userName = usr.toUpperCase();
    const result = await pool.query(querys_1.querys.auth, [userName]);
    const user = result.rows[0];
    console.log({ user });
    if (!user) {
        throw new CustomError_1.NotFoundError('Usuario no encontrado');
    }
    // Validar contraseña
    if (user.pas.trim() !== pas) {
        throw new CustomError_1.NotFoundError('Contraseña incorrecta');
    }
    const sessionId = (0, uuid_1.v4)();
    console.log({ sessionId });
    await (0, generate_redis_1.generateRedisSession)(sessionId, user);
    // Generar JWT
    const token = (0, generate_jwt_1.generateAccessToken)(sessionId);
    const refreshToken = (0, generate_jwt_1.generateRefreshToken)(sessionId);
    const response = { user, token, refreshToken };
    return response;
};
exports.loginService = loginService;
//# sourceMappingURL=authService.js.map