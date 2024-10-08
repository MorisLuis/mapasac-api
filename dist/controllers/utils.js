"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModules = exports.getAddressDirection = exports.getClients = exports.getPaymentType = void 0;
const utilsService_1 = require("../services/utilsService");
const getPaymentType = async (req, res, next) => {
    try {
        // Get session from REDIS.
        const sessionId = req.sessionID;
        const typePayments = await (0, utilsService_1.getPaymentTypeService)(sessionId);
        res.json({ typePayments });
    }
    catch (error) {
        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        }
        ;
        res.status(500).json({ error: 'Error al conectar a la base de datos' });
        return next(error);
    }
};
exports.getPaymentType = getPaymentType;
const getClients = async (req, res, next) => {
    try {
        // Get session from REDIS.
        const sessionId = req.sessionID;
        const { limit, page } = req.query;
        const clients = await (0, utilsService_1.getClientsService)(sessionId, page, limit);
        res.json({ clients });
    }
    catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        }
        ;
        res.status(500).json({ error: 'Error al conectar a la base de datos' });
        return next(error);
    }
};
exports.getClients = getClients;
const getAddressDirection = async (req, res, next) => {
    try {
        // Get session from REDIS.
        const sessionId = req.sessionID;
        const { idpvtadomi } = req.query;
        const address = await (0, utilsService_1.getAddressDirectionService)(sessionId, idpvtadomi);
        res.json({ address });
    }
    catch (error) {
        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        }
        ;
        res.status(500).send(error.message);
        return next(error);
    }
};
exports.getAddressDirection = getAddressDirection;
const getModules = async (req, res, next) => {
    const idusrmob = req.idusrmob;
    if (!idusrmob) {
        return res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
    }
    try {
        // Delegamos la obtención de los módulos al servicio
        const modules = await (0, utilsService_1.getModulesService)(idusrmob);
        return res.json({ modules });
    }
    catch (error) {
        res.status(500).send(error.message);
        return next(error);
    }
};
exports.getModules = getModules;
//# sourceMappingURL=utils.js.map