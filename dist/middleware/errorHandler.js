"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errors_1 = require("../controllers/errors");
const errorHandler = async (err, req, res, next) => {
    console.log("errorHandler");
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    //const Id_Usuario = req.Id_mobile ?? req.IdUsuarioOLEI ?? req.Id_web ?? "Sin Usuario";
    //const Id_Usuario =  "Sin Usuario";
    console.error(`[ERROR] ${req.method} ${req.path} - ${message}`);
    // Intentamos guardar el error en la base de datos
    try {
        await (0, errors_1.handleErrorsBackend)({
            path: req.path,
            Message: message,
            Id_Usuario: '',
            Metodo: req.method,
            code: statusCode.toString(),
            svr: ""
        });
    }
    catch (loggingError) {
        console.error('Error guardando log en la DB:', loggingError);
    }
    res.status(statusCode).json({ error: message });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map