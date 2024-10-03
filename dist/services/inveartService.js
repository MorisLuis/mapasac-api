"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSellService = exports.postInventoryService = void 0;
const moment_1 = __importDefault(require("moment"));
const querys_1 = require("../querys/querys");
const connection_1 = require("../database/connection");
const getSession_1 = require("../utils/Redis/getSession");
const inveartsQuery_1 = require("../querys/inveartsQuery");
const bagQuerys_1 = require("../querys/bagQuerys");
const postInventoryService = async (sessionId) => {
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        throw new Error('Sesion terminada');
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await (0, connection_1.getGlobalPool)(connection);
    const client = await pool.connect();
    if (!client) {
        throw new Error('No se pudo establecer la conexión con la base de datos');
    }
    try {
        const folioDate = (0, moment_1.default)().format('YYYY-MM-DD');
        const folioQuery = querys_1.querys.getFolio;
        const folioValue = await pool.query(folioQuery, [folioDate]);
        const folio = folioValue.rows[0].fn_pedidos_foliounico;
        await client.query('BEGIN');
        await client.query(inveartsQuery_1.inveartsQuerys.createInventory, [idusrmob, folio]);
        await client.query('COMMIT');
        return { message: 'Datos insertados exitosamente' };
    }
    catch (error) {
        await client.query('ROLLBACK');
        throw error;
    }
    finally {
        client.release();
    }
};
exports.postInventoryService = postInventoryService;
const postSellService = async (sessionId, body, opcion) => {
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    const { clavepago, idclientes, comments, domicilio } = body;
    if (!userFR) {
        throw new Error('Sesion terminada');
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await (0, connection_1.getGlobalPool)(connection);
    const client = await pool.connect();
    if (!client) {
        throw new Error('No se pudo establecer la conexión con la base de datos');
    }
    try {
        const folioDate = (0, moment_1.default)().format('YYYY-MM-DD');
        const folioQuery = querys_1.querys.getFolio;
        const folioValue = await pool.query(folioQuery, [folioDate]);
        const folio = folioValue.rows[0].fn_pedidos_foliounico;
        const optionDestination = Number(opcion) + 1;
        console.log({ clavepago, idclientes, comments, domicilio });
        await client.query('BEGIN');
        if (comments) {
            await client.query(bagQuerys_1.bagQuerys.updateProductCommentsFromBag, [comments || "", idclientes || 0, clavepago, idusrmob]);
        }
        ;
        if (domicilio) {
            console.log("update domicilio");
            console.log({ idusrmob });
            await client.query(bagQuerys_1.bagQuerys.updateProductDomicilioFromBag, [domicilio || "", idclientes || 0, clavepago, idusrmob]);
        }
        ;
        console.log({ optionDestination });
        await client.query(inveartsQuery_1.inveartsQuerys.createSale, [idusrmob, folio, opcion, optionDestination]);
        await client.query('COMMIT');
        return { message: 'Datos insertados exitosamente' };
    }
    catch (error) {
        await client.query('ROLLBACK');
        throw error;
    }
    finally {
        client.release();
    }
};
exports.postSellService = postSellService;
//# sourceMappingURL=inveartService.js.map