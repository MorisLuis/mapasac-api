"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRefreshJWT = exports.validateJWT = void 0;
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const CustomError_1 = require("../errors/CustomError");
const redisClient_1 = __importDefault(require("../config/redisClient"));
const validateJWT = async (req, _res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    if (!token) {
        return next(new CustomError_1.ForbiddenError('Acceso denegado. Falta token o es inválido'));
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const sessionId = decoded.sessionId;
        req.sessionId = sessionId;
        if (!sessionId) {
            return next(new CustomError_1.ForbiddenError('Acceso denegado. Token inválido'));
        }
        const sessionDataRaw = await redisClient_1.default.get(`session:${sessionId}`);
        if (!sessionDataRaw) {
            return next(new CustomError_1.ForbiddenError('Sesión no válida'));
        }
        let session;
        try {
            session = JSON.parse(sessionDataRaw);
        }
        catch (parseError) {
            return next(new CustomError_1.AppError(`Error al procesar datos de sesión: ${parseError}`));
        }
        req.session = session;
        return next();
    }
    catch (error) {
        switch (true) {
            case error instanceof jsonwebtoken_1.TokenExpiredError:
                return next(new CustomError_1.ForbiddenError('El token ha expirado, por favor, inicia sesión nuevamente'));
            case error instanceof jsonwebtoken_1.JsonWebTokenError:
                return next(new CustomError_1.ForbiddenError('Token inválido, por favor verifica tus credenciales'));
            case error instanceof Error:
                return next(new CustomError_1.AppError(`Fallo al autenticar el token: ${error.message}`));
            default:
                return next(new CustomError_1.AppError('Fallo desconocido al autenticar el token'));
        }
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
        switch (true) {
            case error instanceof jsonwebtoken_1.TokenExpiredError:
                return next(new CustomError_1.UnauthorizedError('El token ha expirado, por favor, inicia sesión nuevamente'));
            case error instanceof jsonwebtoken_1.JsonWebTokenError:
                return next(new CustomError_1.UnauthorizedError('Token inválido, por favor verifica tus credenciales'));
            case error instanceof Error:
                return next(new CustomError_1.UnauthorizedError(`Fallo al autenticar el token: ${error.message}`));
            default:
                return next(new CustomError_1.UnauthorizedError('Fallo desconocido al autenticar el token'));
        }
    }
};
exports.validateRefreshJWT = validateRefreshJWT;
//# sourceMappingURL=validate-jwt.js.map