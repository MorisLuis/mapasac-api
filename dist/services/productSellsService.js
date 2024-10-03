"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIdinveartsProductService = exports.getTotalClassesSellsService = exports.getTotalProductsSellsService = exports.getUnitsService = exports.getProductByEnlacemobService = exports.getProductsSellsFromFamilyService = exports.getProductsSellsService = void 0;
const getSession_1 = require("../utils/Redis/getSession");
const connection_1 = require("../database/connection");
const productSellsQuery_1 = require("../querys/productSellsQuery");
const getProductsSellsService = async (sessionId, page, limit) => {
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        throw new Error('Sesion terminada');
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await (0, connection_1.getGlobalPool)(connection);
    const result = await pool.query(productSellsQuery_1.productSellsQuerys.getProductsSells, [page, limit]);
    const products = result.rows.map((product) => {
        if (product.imagen) {
            product.imagen = Buffer.from(product.imagen, 'base64').toString();
        }
        return product;
    });
    return products;
};
exports.getProductsSellsService = getProductsSellsService;
const getProductsSellsFromFamilyService = async (sessionId, cvefamilia) => {
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        throw new Error('Sesion terminada');
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await (0, connection_1.getGlobalPool)(connection);
    const result = await pool.query(productSellsQuery_1.productSellsQuerys.getProductsSellsFromFamily, [cvefamilia]);
    return result.rows;
};
exports.getProductsSellsFromFamilyService = getProductsSellsFromFamilyService;
const getProductByEnlacemobService = async (sessionId, idinvearts, idinveclas, capa) => {
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        throw new Error('Sesion terminada');
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await (0, connection_1.getGlobalPool)(connection);
    const result = await pool.query(productSellsQuery_1.productSellsQuerys.getProductByEnlacemob, [idinvearts, idinveclas, capa]);
    const product = result.rows[0];
    return product;
};
exports.getProductByEnlacemobService = getProductByEnlacemobService;
const getUnitsService = async (sessionId) => {
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        throw new Error('Sesion terminada');
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await (0, connection_1.getGlobalPool)(connection);
    const result = await pool.query(productSellsQuery_1.productSellsQuerys.getUnits);
    const units = result.rows;
    return units;
};
exports.getUnitsService = getUnitsService;
const getTotalProductsSellsService = async (sessionId) => {
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        throw new Error('Sesion terminada');
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await (0, connection_1.getGlobalPool)(connection);
    const result = await pool.query(productSellsQuery_1.productSellsQuerys.getTotalProductsSells);
    const total = result.rows[0].total;
    return total;
};
exports.getTotalProductsSellsService = getTotalProductsSellsService;
const getTotalClassesSellsService = async (sessionId, cvefamilia) => {
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        throw new Error('Sesion terminada');
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await (0, connection_1.getGlobalPool)(connection);
    const result = await pool.query(productSellsQuery_1.productSellsQuerys.getTotalClassesSells, [cvefamilia]);
    const total = result.rows[0].count;
    return total;
};
exports.getTotalClassesSellsService = getTotalClassesSellsService;
const getIdinveartsProductService = async (sessionId, cvefamilia) => {
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        throw new Error('Sesion terminada');
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await (0, connection_1.getGlobalPool)(connection);
    const result = await pool.query(productSellsQuery_1.productSellsQuerys.getIdinveartsProduct, [cvefamilia]);
    const product = result.rows[0];
    return product;
};
exports.getIdinveartsProductService = getIdinveartsProductService;
//# sourceMappingURL=productSellsService.js.map