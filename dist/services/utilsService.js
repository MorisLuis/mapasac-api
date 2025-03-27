"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModulesService = exports.getAddressDirectionService = exports.getClientsService = exports.getPaymentTypeService = void 0;
const connection_1 = require("../database/connection");
const utilsQuery_1 = require("../querys/utilsQuery");
const CustomError_1 = require("../errors/CustomError");
const getPaymentTypeService = async (session) => {
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
    const result = await pool.query(utilsQuery_1.utilsQuery.getPaymentType);
    const typePayments = result.rows;
    const response = { typePayments };
    return response;
};
exports.getPaymentTypeService = getPaymentTypeService;
const getClientsService = async (session, page, limit) => {
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
    const result = await pool.query(utilsQuery_1.utilsQuery.getClients, [page, limit]);
    const clients = result.rows;
    const response = { clients };
    return response;
};
exports.getClientsService = getClientsService;
const getAddressDirectionService = async (session, idpvtadomi) => {
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
    const result = await pool.query(utilsQuery_1.utilsQuery.getAddressDirection, [idpvtadomi]);
    const address = result.rows[0];
    const response = { address };
    return response;
};
exports.getAddressDirectionService = getAddressDirectionService;
const getModulesService = async (idusrmob) => {
    const pool = await (0, connection_1.dbConnectionInitial)();
    if (!pool) {
        throw new CustomError_1.ValidationError('No se pudo establecer la conexión con la base de datos');
    }
    ;
    try {
        const result = await pool.query(utilsQuery_1.utilsQuery.getModules, [idusrmob]);
        const modules = result.rows;
        const response = { modules };
        return response;
    }
    catch (error) {
        throw new CustomError_1.AppError(`${error}`);
    }
    finally {
        await pool.end();
    }
};
exports.getModulesService = getModulesService;
//# sourceMappingURL=utilsService.js.map