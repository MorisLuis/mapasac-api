"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalProductsSellsRestaurantService = exports.getProductSellsRestaurantDetailsService = exports.getProductsSellsRestaurantService = void 0;
const getSession_1 = require("../utils/Redis/getSession");
const connection_1 = require("../database/connection");
const productSellsRestaurantQuery_1 = require("../querys/productSellsRestaurantQuery");
const getProductsSellsRestaurantService = async (sessionId, page, limit) => {
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        throw new Error('Sesion terminada');
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await (0, connection_1.getGlobalPool)(connection);
    const result = await pool.query(productSellsRestaurantQuery_1.productSellsRestaurantQuerys.getProductsSellsRestaurant, [page, limit]);
    const products = result.rows.map((product) => {
        if (product.imagen) {
            product.imagen = Buffer.from(product.imagen, 'base64').toString();
        }
        return product;
    });
    return products;
};
exports.getProductsSellsRestaurantService = getProductsSellsRestaurantService;
const getProductSellsRestaurantDetailsService = async (sessionId, cvefamilia) => {
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        throw new Error('Sesion terminada');
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await (0, connection_1.getGlobalPool)(connection);
    const result = await pool.query(productSellsRestaurantQuery_1.productSellsRestaurantQuerys.getProductSellsRestaurantDetails, [cvefamilia]);
    const product = result.rows;
    return product;
};
exports.getProductSellsRestaurantDetailsService = getProductSellsRestaurantDetailsService;
const getTotalProductsSellsRestaurantService = async (sessionId) => {
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        throw new Error('Sesion terminada');
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await (0, connection_1.getGlobalPool)(connection);
    const result = await pool.query(productSellsRestaurantQuery_1.productSellsRestaurantQuerys.getTotalProductsSellsRestaurant);
    const total = result.rows[0].total;
    return total;
};
exports.getTotalProductsSellsRestaurantService = getTotalProductsSellsRestaurantService;
//# sourceMappingURL=productSellsRestaurantService.js.map