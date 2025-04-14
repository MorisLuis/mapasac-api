"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIdinveartsProductService = exports.getTotalClassesSellsService = exports.getTotalProductsSellsService = exports.getUnitsService = exports.getProductByEnlacemobService = exports.getProductsSellsFromFamilyService = exports.getProductsSellsService = void 0;
const productSellsQuery_1 = require("../querys/productSellsQuery");
const connection_1 = require("../database/connection");
const CustomError_1 = require("../errors/CustomError");
const buffer_1 = require("buffer");
const getProductsSellsService = async (session, page, limit) => {
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
    const result = await pool.query(productSellsQuery_1.productSellsQuerys.getProductsSells, [page, limit]);
    const products = result.rows.map((product) => {
        if (product.imagen) {
            product.imagen = buffer_1.Buffer.from(product.imagen, 'base64').toString();
        }
        return product;
    });
    const response = { products };
    return response;
};
exports.getProductsSellsService = getProductsSellsService;
const getProductsSellsFromFamilyService = async (session, cvefamilia) => {
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
    const result = await pool.query(productSellsQuery_1.productSellsQuerys.getProductsSellsFromFamily, [cvefamilia]);
    const classes = result.rows;
    const response = { classes };
    return response;
};
exports.getProductsSellsFromFamilyService = getProductsSellsFromFamilyService;
const getProductByEnlacemobService = async (session, idinvearts, idinveclas, capa) => {
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
    const result = await pool.query(productSellsQuery_1.productSellsQuerys.getProductByEnlacemob, [idinvearts, idinveclas, capa]);
    const products = result.rows[0];
    const response = { products };
    return response;
};
exports.getProductByEnlacemobService = getProductByEnlacemobService;
const getUnitsService = async (session) => {
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
    const result = await pool.query(productSellsQuery_1.productSellsQuerys.getUnits);
    const units = result.rows;
    const response = { units };
    return response;
};
exports.getUnitsService = getUnitsService;
const getTotalProductsSellsService = async (session) => {
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
    const result = await pool.query(productSellsQuery_1.productSellsQuerys.getTotalProductsSells);
    const total = result.rows[0].total;
    const response = { total };
    return response;
};
exports.getTotalProductsSellsService = getTotalProductsSellsService;
const getTotalClassesSellsService = async (session, cvefamilia) => {
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
    const result = await pool.query(productSellsQuery_1.productSellsQuerys.getTotalClassesSells, [cvefamilia]);
    const total = result.rows[0].count;
    const response = { total };
    return response;
};
exports.getTotalClassesSellsService = getTotalClassesSellsService;
const getIdinveartsProductService = async (session, cvefamilia) => {
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
    const result = await pool.query(productSellsQuery_1.productSellsQuerys.getIdinveartsProduct, [cvefamilia]);
    const idinvearts = result.rows[0];
    const response = idinvearts;
    return response;
};
exports.getIdinveartsProductService = getIdinveartsProductService;
//# sourceMappingURL=productSellsService.js.map