"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchClientsService = exports.searchProductInBagService = exports.searchProductService = void 0;
const connection_1 = require("../database/connection");
const searchQuery_1 = require("../querys/searchQuery");
const getSession_1 = require("../utils/Redis/getSession");
const searchProductService = async (sessionId, searchTerm) => {
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        throw new Error('Sesion terminada');
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await (0, connection_1.getGlobalPool)(connection);
    const result = await pool.query(searchQuery_1.searchQuerys.searchProduct, [searchTerm]);
    const products = result.rows;
    return products;
};
exports.searchProductService = searchProductService;
const searchProductInBagService = async (sessionId, searchTerm, opcion) => {
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        throw new Error('Sesion terminada');
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await (0, connection_1.getGlobalPool)(connection);
    const result = await pool.query(opcion === '2' ? searchQuery_1.searchQuerys.searchProductInBagSells : searchQuery_1.searchQuerys.searchProductInBag, [opcion, idusrmob, searchTerm]);
    const products = result.rows;
    return products;
};
exports.searchProductInBagService = searchProductInBagService;
const searchClientsService = async (sessionId, searchTerm) => {
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        throw new Error('Sesion terminada');
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await (0, connection_1.getGlobalPool)(connection);
    const result = await pool.query(searchQuery_1.searchQuerys.searchClients, [searchTerm]);
    const clients = result.rows;
    return clients;
};
exports.searchClientsService = searchClientsService;
//# sourceMappingURL=searchService.js.map