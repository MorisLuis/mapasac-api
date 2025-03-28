"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalProductsSellsRestaurantService = exports.getProductSellsRestaurantDetailsService = exports.getProductsSellsRestaurantService = void 0;
const productSellsRestaurantQuery_1 = require("../querys/productSellsRestaurantQuery");
const connection_1 = require("../database/connection");
const CustomError_1 = require("../errors/CustomError");
const buffer_1 = require("buffer");
const getProductsSellsRestaurantService = async (session, page, limit) => {
    const { svr, dba, pasdba, usrdba, port } = session;
    const config = {
        user: usrdba,
        database: dba,
        password: pasdba,
        port: port,
        host: svr
    };
    const pool = await (0, connection_1.dbConnection)(config);
    if (!pool) {
        throw new CustomError_1.ValidationError('No se pudo establecer la conexión con la base de datos');
    }
    const result = await pool.query(productSellsRestaurantQuery_1.productSellsRestaurantQuerys.getProductsSellsRestaurant, [page, limit]);
    const products = result.rows.map((product) => {
        if (product.imagen) {
            product.imagen = buffer_1.Buffer.from(product.imagen, 'base64').toString();
        }
        return product;
    });
    const response = { products };
    return response;
};
exports.getProductsSellsRestaurantService = getProductsSellsRestaurantService;
// PENDING
// we modify const product = result.rows to const product = result.rows[0].
const getProductSellsRestaurantDetailsService = async (session, cvefamilia) => {
    const { svr, dba, pasdba, usrdba, port } = session;
    const config = {
        user: usrdba,
        database: dba,
        password: pasdba,
        port: port,
        host: svr
    };
    const pool = await (0, connection_1.dbConnection)(config);
    if (!pool) {
        throw new CustomError_1.ValidationError('No se pudo establecer la conexión con la base de datos');
    }
    const result = await pool.query(productSellsRestaurantQuery_1.productSellsRestaurantQuerys.getProductSellsRestaurantDetails, [cvefamilia]);
    const product = result.rows[0];
    const response = { product };
    return response;
};
exports.getProductSellsRestaurantDetailsService = getProductSellsRestaurantDetailsService;
const getTotalProductsSellsRestaurantService = async (session) => {
    const { svr, dba, pasdba, usrdba, port } = session;
    const config = {
        user: usrdba,
        database: dba,
        password: pasdba,
        port: port,
        host: svr
    };
    const pool = await (0, connection_1.dbConnection)(config);
    if (!pool) {
        throw new CustomError_1.ValidationError('No se pudo establecer la conexión con la base de datos');
    }
    ;
    const result = await pool.query(productSellsRestaurantQuery_1.productSellsRestaurantQuerys.getTotalProductsSellsRestaurant);
    const total = result.rows[0].total;
    const response = { total };
    return response;
};
exports.getTotalProductsSellsRestaurantService = getTotalProductsSellsRestaurantService;
//# sourceMappingURL=productSellsRestaurantService.js.map