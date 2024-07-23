"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSell = exports.postInventory = void 0;
const connection_1 = require("../database/connection");
const moment_1 = __importDefault(require("moment"));
const querys_1 = require("../querys/querys");
const postInventory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pool = yield (0, connection_1.dbConnection)();
    const client = yield pool.connect();
    if (!client) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
        return;
    }
    const idusrmob = req.idusrmob;
    const folioDate = (0, moment_1.default)().format('YYYY-MM-DD');
    const folioQuery = querys_1.querys.getFolio;
    const folioValue = yield pool.query(folioQuery, [folioDate]);
    const folio = folioValue.rows[0].fn_pedidos_foliounico;
    try {
        yield client.query('BEGIN');
        yield client.query(querys_1.querys.createInventory, [idusrmob, folio]);
        yield client.query('COMMIT');
        res.status(201).json({ message: 'Datos insertados exitosamente' });
    }
    catch (error) {
        yield client.query('ROLLBACK');
        console.error('Error:', error);
        res.status(500).json({ error: 'Error al insertar los datos', details: error.message });
    }
    finally {
        client.release();
    }
});
exports.postInventory = postInventory;
const postSell = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pool = yield (0, connection_1.dbConnection)();
    const client = yield pool.connect();
    if (!client) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
        return;
    }
    const idusrmob = req.idusrmob;
    const folioDate = (0, moment_1.default)().format('YYYY-MM-DD');
    const folioQuery = querys_1.querys.getFolio;
    const folioValue = yield pool.query(folioQuery, [folioDate]);
    const folio = folioValue.rows[0].fn_pedidos_foliounico;
    try {
        yield client.query('BEGIN');
        yield client.query(querys_1.querys.createSale, [idusrmob, folio]);
        yield client.query('COMMIT');
        res.status(201).json({ message: 'Datos insertados exitosamente' });
    }
    catch (error) {
        yield client.query('ROLLBACK');
        console.error('Error:', error);
        res.status(500).json({ error: 'Error al insertar los datos', details: error.message });
    }
    finally {
        client.release();
    }
});
exports.postSell = postSell;
//# sourceMappingURL=inveart.js.map