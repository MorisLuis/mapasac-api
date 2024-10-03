"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModulesService = exports.getAddressDirectionService = exports.getClientsService = exports.getPaymentTypeService = void 0;
const connection_1 = require("../database/connection");
const utilsQuery_1 = require("../querys/utilsQuery");
const getSession_1 = require("../utils/Redis/getSession");
const getPaymentTypeService = async (sessionId) => {
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        throw new Error('Sesion terminada');
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await (0, connection_1.getGlobalPool)(connection);
    const result = await pool.query(utilsQuery_1.utilsQuery.getPaymentType);
    const typePayments = result.rows;
    return typePayments;
};
exports.getPaymentTypeService = getPaymentTypeService;
const getClientsService = async (sessionId, page, limit) => {
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        throw new Error('Sesion terminada');
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await (0, connection_1.getGlobalPool)(connection);
    const result = await pool.query(utilsQuery_1.utilsQuery.getClients, [page, limit]);
    const clients = result.rows;
    return clients;
};
exports.getClientsService = getClientsService;
const getAddressDirectionService = async (sessionId, idpvtadomi) => {
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        throw new Error('Sesion terminada');
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await (0, connection_1.getGlobalPool)(connection);
    const result = await pool.query(utilsQuery_1.utilsQuery.getAddressDirection, [idpvtadomi]);
    const address = result.rows[0];
    return address;
};
exports.getAddressDirectionService = getAddressDirectionService;
const getModulesService = async (idusrmob) => {
    const pool = await (0, connection_1.dbConnectionInitial)();
    try {
        const result = await pool.query(utilsQuery_1.utilsQuery.getModules, [idusrmob]);
        return result.rows;
    }
    catch (error) {
        throw error;
    }
    finally {
        await pool.end();
    }
};
exports.getModulesService = getModulesService;
//# sourceMappingURL=utilsService.js.map