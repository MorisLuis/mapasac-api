"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const CustomError_1 = require("../errors/CustomError");
const redisClient_1 = __importDefault(require("../config/redisClient"));
// Middleware to validate JWT from first login. (App)
const validateJWT = async (req, res, next) => {
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
    catch (err) {
        return res.status(500).json({ success: false, message: 'Failed to authenticate token' });
    }
};
exports.validateJWT = validateJWT;
//# sourceMappingURL=validate-jwt.js.map