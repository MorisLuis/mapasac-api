"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModules = exports.getAddressDirection = exports.getClients = exports.getPaymentType = void 0;
const utilsService_1 = require("../services/utilsService");
const getPaymentType = async (req, res, next) => {
    try {
        const session = req.session;
        const typePayments = await (0, utilsService_1.getPaymentTypeService)(session);
        res.json({ typePayments });
    }
    catch (error) {
        return next(error);
    }
};
exports.getPaymentType = getPaymentType;
const getClients = async (req, res, next) => {
    try {
        const session = req.session;
        const { limit, page } = req.query;
        const clients = await (0, utilsService_1.getClientsService)(session, page, limit);
        res.json({ clients });
    }
    catch (error) {
        return next(error);
    }
};
exports.getClients = getClients;
const getAddressDirection = async (req, res, next) => {
    try {
        // Get session from REDIS.
        const session = req.session;
        const { idpvtadomi } = req.query;
        const address = await (0, utilsService_1.getAddressDirectionService)(session, idpvtadomi);
        res.json({ address });
    }
    catch (error) {
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
        return next(error);
    }
};
exports.getModules = getModules;
//# sourceMappingURL=utils.js.map