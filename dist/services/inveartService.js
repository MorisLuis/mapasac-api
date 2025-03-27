"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSellService = exports.postInventoryService = void 0;
const moment_1 = __importDefault(require("moment"));
const querys_1 = require("../querys/querys");
const inveartsQuery_1 = require("../querys/inveartsQuery");
const connection_1 = require("../database/connection");
const CustomError_1 = require("../errors/CustomError");
const postInventoryService = async (session) => {
    const { idusrmob, svr, dba, pasdba, usrdba, port } = session;
    const config = {
        user: usrdba,
        database: dba,
        password: pasdba,
        port: port,
        host: svr
    };
    const pool = await (0, connection_1.dbConnection)(config);
    const client = await pool.connect();
    if (!client) {
        throw new CustomError_1.ValidationError('No se pudo establecer la conexión con la base de datos');
    }
    try {
        const folioDate = (0, moment_1.default)().format('YYYY-MM-DD');
        const folioQuery = querys_1.querys.getFolio;
        const folioValue = await pool.query(folioQuery, [folioDate]);
        const folio = folioValue.rows[0].fn_pedidos_foliounico;
        await client.query('BEGIN');
        await client.query(inveartsQuery_1.inveartsQuerys.createInventory, [idusrmob, folio]);
        await client.query('COMMIT');
        return { message: 'Datos insertados exitosamente', folio: folio };
    }
    catch (error) {
        await client.query('ROLLBACK');
        throw new CustomError_1.AppError(`Error al publicar inventario: ${error}`);
    }
    finally {
        client.release();
    }
};
exports.postInventoryService = postInventoryService;
const postSellService = async (session, body, opcion) => {
    const { clavepago, idclientes, comments, domicilio, idviaenvio } = body;
    const { idusrmob, svr, dba, pasdba, usrdba, port } = session;
    const config = {
        user: usrdba,
        database: dba,
        password: pasdba,
        port: port,
        host: svr
    };
    const pool = await (0, connection_1.dbConnection)(config);
    const client = await pool.connect();
    if (!client) {
        throw new CustomError_1.ValidationError('No se pudo establecer la conexión con la base de datos');
    }
    try {
        const folioDate = (0, moment_1.default)().format('YYYY-MM-DD');
        const folioQuery = querys_1.querys.getFolio;
        const folioValue = await pool.query(folioQuery, [folioDate]);
        const folio = folioValue.rows[0].fn_pedidos_foliounico;
        const optionDestination = opcion + 1;
        await client.query('BEGIN');
        await client.query(inveartsQuery_1.inveartsQuerys.createSaleTest, [
            optionDestination,
            folio,
            (comments ?? "").toUpperCase(), // Convierte domicilio a mayúsculas
            (domicilio ?? "").toUpperCase(), // Convierte domicilio a mayúsculas
            idviaenvio,
            clavepago,
            idclientes,
            opcion,
            idusrmob
        ]);
        await client.query('COMMIT');
        return { message: 'Datos insertados exitosamente', folio: folio };
    }
    catch (error) {
        await client.query('ROLLBACK');
        throw new CustomError_1.AppError(`Error al publicar venta: ${error}`);
    }
    finally {
        client.release();
    }
};
exports.postSellService = postSellService;
//# sourceMappingURL=inveartService.js.map