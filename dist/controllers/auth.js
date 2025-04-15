"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.refresh = exports.login = void 0;
const authService_1 = require("../services/authService");
const generate_redis_1 = require("../helpers/generate-redis");
const generate_jwt_1 = require("../helpers/generate-jwt");
const CustomError_1 = require("../errors/CustomError");
const login = async (req, res, next) => {
    try {
        const { usr, pas } = req.body;
        const { user, token, refreshToken } = await (0, authService_1.loginService)(usr, pas);
        res.json({
            user,
            token,
            refreshToken
        });
    }
    catch (error) {
        return next(error);
    }
};
exports.login = login;
const refresh = async (req, res, next) => {
    try {
        const session = req.session;
        const sessionId = req.sessionId;
        const refreshToken = req.body.refreshToken;
        if (!refreshToken) {
            throw new CustomError_1.UnauthorizedError("No hay refresh token");
        }
        // Guardar la sesión en Redis con expiración (1 hora)
        await (0, generate_redis_1.generateRedisSession)(sessionId, session);
        // Generar el token JWT que incluye el sessionId
        const newToken = (0, generate_jwt_1.generateAccessToken)(sessionId);
        const newRefreshToken = (0, generate_jwt_1.generateRefreshToken)(sessionId);
        const response = { user: session, token: newToken, refreshToken: newRefreshToken };
        res.json(response);
    }
    catch (error) {
        return next(error);
    }
};
exports.refresh = refresh;
const logout = async (req, res, next) => {
    try {
        const sessionId = req.sessionId;
        console.log({ sessionId });
        if (!sessionId)
            throw new CustomError_1.UnauthorizedError('Sesion terminada');
        await (0, generate_redis_1.handleDeleteRedisSession)(sessionId);
        res.json({ ok: true });
    }
    catch (error) {
        next(error);
    }
    ;
};
exports.logout = logout;
//# sourceMappingURL=auth.js.map