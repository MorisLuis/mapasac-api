"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = async (err, req, res, _next) => {
    console.log("errorHandler");
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    //const Id_Usuario = req.Id_mobile ?? req.IdUsuarioOLEI ?? req.Id_web ?? "Sin Usuario";
    //const Id_Usuario =  "Sin Usuario";
    console.error(`[ERROR] ${req.method} ${req.path} - ${message}`);
    // Intentamos guardar el error en la base de datos
    try {
        /*  await handleErrorsEndpoint({
           From: req.path,                    // O el nombre del módulo o componente donde ocurrió el error
           Message: message,                  // Mensaje de error
           Id_Usuario: Id_Usuario,  // O extraerlo de la sesión, si lo tienes
           Metodo: req.method,                // Método HTTP
           code: statusCode.toString()        // Código de error convertido a string
         }); */
    }
    catch (loggingError) {
        console.error('Error guardando log en la DB:', loggingError);
    }
    res.status(statusCode).json({ error: message });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map