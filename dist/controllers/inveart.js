"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSell = exports.postInventory = void 0;
const connection_1 = require("../database/connection");
const querys_1 = require("../querys/querys");
const moment_1 = __importDefault(require("moment"));
const bagQuerys_1 = require("../querys/bagQuerys");
const postInventory = async (req, res) => {
    const idusrmob = req.idusrmob;
    if (!idusrmob) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
        return;
    }
    ;
    const pool = await (0, connection_1.dbConnection)({ idusrmob });
    const client = await pool.connect();
    if (!client) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
        return;
    }
    try {
        const folioDate = (0, moment_1.default)().format('YYYY-MM-DD');
        const folioQuery = querys_1.querys.getFolio;
        const folioValue = await pool.query(folioQuery, [folioDate]);
        const folio = folioValue.rows[0].fn_pedidos_foliounico;
        await client.query('BEGIN');
        await client.query(querys_1.querys.createInventory, [idusrmob, folio]);
        await client.query('COMMIT');
        res.status(201).json({ message: 'Datos insertados exitosamente' });
    }
    catch (error) {
        console.log('Error:', error);
        res.status(500).send(error.message);
        await client.query('ROLLBACK');
    }
    finally {
        client.release();
    }
};
exports.postInventory = postInventory;
const postSell = async (req, res) => {
    const idusrmob = req.idusrmob;
    const { mercado } = req.query;
    const { clavepago, idclientes, comments } = req.body;
    if (!idusrmob) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
        return;
    }
    ;
    let pool;
    if (mercado === 'true') {
        pool = await (0, connection_1.dbConnection)({ idusrmob, database: "mercado" });
    }
    else {
        pool = await (0, connection_1.dbConnection)({ idusrmob });
    }
    ;
    const client = await pool.connect();
    if (!client) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
        return;
    }
    try {
        const folioDate = (0, moment_1.default)().format('YYYY-MM-DD');
        const folioQuery = querys_1.querys.getFolio;
        const folioValue = await pool.query(folioQuery, [folioDate]);
        const folio = folioValue.rows[0].fn_pedidos_foliounico;
        await client.query('BEGIN');
        await client.query(bagQuerys_1.bagQuerys.updateProductCommentsFromBag, [comments || "", idclientes || 0, clavepago, idusrmob]);
        await client.query(querys_1.querys.createSale, [idusrmob, folio]);
        await client.query('COMMIT');
        res.status(201).json({ message: 'Datos insertados exitosamente' });
    }
    catch (error) {
        await client.query('ROLLBACK');
        console.log('Error:', error);
        res.status(500).send(error.message);
    }
    finally {
        client.release();
    }
};
exports.postSell = postSell;
//# sourceMappingURL=inveart.js.map