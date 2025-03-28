"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchClientsService = exports.searchProductInBagService = exports.searchProductService = void 0;
const connection_1 = require("../database/connection");
const CustomError_1 = require("../errors/CustomError");
const searchQuery_1 = require("../querys/searchQuery");
const searchProductService = async (session, searchTerm) => {
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
    const result = await pool.query(searchQuery_1.searchQuerys.searchProduct, [searchTerm]);
    const products = result.rows;
    const response = { products };
    return response;
};
exports.searchProductService = searchProductService;
const searchProductInBagService = async (session, searchTerm, opcion) => {
    const { svr, dba, pasdba, usrdba, port, idusrmob } = session;
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
    const result = await pool.query(opcion === 2 ? searchQuery_1.searchQuerys.searchProductInBagSells : searchQuery_1.searchQuerys.searchProductInBag, [opcion, idusrmob, searchTerm]);
    const products = result.rows;
    const response = { products };
    return response;
};
exports.searchProductInBagService = searchProductInBagService;
const searchClientsService = async (session, searchTerm) => {
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
    const result = await pool.query(searchQuery_1.searchQuerys.searchClients, [searchTerm]);
    const clients = result.rows;
    const response = { clients };
    return response;
};
exports.searchClientsService = searchClientsService;
//# sourceMappingURL=searchService.js.map