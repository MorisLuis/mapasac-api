"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = exports.DatabaseError = exports.errorHandler = void 0;
const errors_1 = __importDefault(require("../controllers/errors"));
const getSession_1 = require("../utils/Redis/getSession");
// Error de base de datos o conexión
class DatabaseError extends Error {
    constructor(message) {
        super(message);
        this.status = 500;
        this.name = 'DatabaseError';
    }
}
exports.DatabaseError = DatabaseError;
// Error personalizado
class CustomError extends Error {
    constructor(message, status = 400) {
        super(message);
        this.status = status;
    }
}
exports.CustomError = CustomError;
// Middleware de manejo de errores
const errorHandler = async (err, req, res, next) => {
    const sessionId = req.sessionID;
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    console.log({ userFR });
    if (!userFR)
        return;
    console.log({ sessionId });
    const error = {
        Message: err.message,
        Metodo: req.method,
        path: req.originalUrl,
        Id_Usuario: userFR?.idusrmob,
        svr: userFR?.svr
    };
    await (0, errors_1.default)(error);
    // Manejo de errores específicos
    if (err instanceof DatabaseError) {
        return res.status(500).json({
            success: false,
            message: 'Error de base de datos: ' + err.message,
        });
    }
    // Otros errores personalizados
    if (err instanceof CustomError) {
        return res.status(err.status).json({
            success: false,
            message: err.message,
        });
    }
    // Para otros tipos de errores no manejados
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Error interno del servidor',
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map