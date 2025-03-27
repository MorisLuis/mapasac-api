"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRefreshJWT = exports.validateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const CustomError_1 = require("../errors/CustomError");
const redisClient_1 = __importDefault(require("../config/redisClient"));
const validateJWT = async (req, _res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    if (!token) {
        return next(new CustomError_1.UnauthorizedError('Acceso denegado. Falta token o es invalido'));
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const sessionId = decoded.sessionId;
        req.sessionId = sessionId;
        const sessionDataRaw = await redisClient_1.default.get(`session:${sessionId}`);
        const sessionData = sessionDataRaw ?? null;
        if (!sessionData) {
            return next(new CustomError_1.UnauthorizedError('Sesión no válida'));
        }
        ;
        try {
            const session = JSON.parse(sessionData);
            req.session = session;
            return next();
        }
        catch (error) {
            return next(new CustomError_1.AppError(`Error parsing session data ${error}`));
        }
    }
    catch (error) {
        next(new CustomError_1.AppError(`Fallo al autenticar el token: ${error}`));
    }
};
exports.validateJWT = validateJWT;
const validateRefreshJWT = async (req, _res, next) => {
    // Obtener el refreshToken del body
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        return next(new CustomError_1.ForbiddenError('Token inválido o expirado'));
    }
    try {
        // Verificar el refreshToken usando la clave secreta específica para el refreshToken
        const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const sessionId = decoded.sessionId;
        req.sessionId = sessionId;
        // Buscar la sesión en Redis usando el sessionId
        const sessionDataRaw = await redisClient_1.default.get(`session:${sessionId}`);
        const sessionData = sessionDataRaw ?? null;
        if (!sessionData) {
            return next(new CustomError_1.ForbiddenError('Sesion terminada'));
        }
        try {
            // Parsear los datos de la sesión obtenida de Redis
            const session = JSON.parse(sessionData);
            // Guardar la sesión en la solicitud para el uso posterior
            req.session = session;
            // Pasar al siguiente middleware
            return next();
        }
        catch (error) {
            return next(new CustomError_1.AppError(`Error parsing session data: ${error}`));
        }
    }
    catch (error) {
        next(new CustomError_1.ForbiddenError(`Token expirado o inválido: ${error}`));
    }
};
exports.validateRefreshJWT = validateRefreshJWT;
//# sourceMappingURL=validate-jwt.js.map