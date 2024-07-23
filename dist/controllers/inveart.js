"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSell = exports.postInventory = void 0;
const connection_1 = require("../database/connection");
const querys_1 = require("../querys/querys");
const moment_1 = __importDefault(require("moment"));
const postInventory = async (req, res) => {
    const pool = await (0, connection_1.dbConnection)();
    const client = await pool.connect();
    if (!client) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
        return;
    }
    const idusrmob = req.idusrmob;
    const folioDate = (0, moment_1.default)().format('YYYY-MM-DD');
    const folioQuery = querys_1.querys.getFolio;
    const folioValue = await pool.query(folioQuery, [folioDate]);
    const folio = folioValue.rows[0].fn_pedidos_foliounico;
    try {
        await client.query('BEGIN');
        await client.query(querys_1.querys.createInventory, [idusrmob, folio]);
        await client.query('COMMIT');
        res.status(201).json({ message: 'Datos insertados exitosamente' });
    }
    catch (error) {
        await client.query('ROLLBACK');
        console.error('Error:', error);
        res.status(500).json({ error: 'Error al insertar los datos', details: error.message });
    }
    finally {
        client.release();
    }
};
exports.postInventory = postInventory;
const postSell = async (req, res) => {
    const pool = await (0, connection_1.dbConnection)();
    const client = await pool.connect();
    if (!client) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
        return;
    }
    const idusrmob = req.idusrmob;
    const folioDate = (0, moment_1.default)().format('YYYY-MM-DD');
    const folioQuery = querys_1.querys.getFolio;
    const folioValue = await pool.query(folioQuery, [folioDate]);
    const folio = folioValue.rows[0].fn_pedidos_foliounico;
    try {
        await client.query('BEGIN');
        await client.query(querys_1.querys.createSale, [idusrmob, folio]);
        await client.query('COMMIT');
        res.status(201).json({ message: 'Datos insertados exitosamente' });
    }
    catch (error) {
        await client.query('ROLLBACK');
        console.error('Error:', error);
        res.status(500).json({ error: 'Error al insertar los datos', details: error.message });
    }
    finally {
        client.release();
    }
};
exports.postSell = postSell;
//# sourceMappingURL=inveart.js.map