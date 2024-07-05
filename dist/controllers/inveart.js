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
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertInventoryDetails = exports.getInveartById = exports.getInveartByClave = exports.getInveart = void 0;
const connection_1 = require("../database/connection");
const querys_1 = require("../querys");
const getInveart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield (0, connection_1.dbConnection)();
        if (!pool) {
            res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
            return;
        }
        const { limit, page } = req.query;
        const result = yield pool.query(querys_1.querys.inveart, [page, limit]);
        const products = result.rows;
        res.json({
            total: products.length,
            products
        });
    }
    catch (error) {
        console.log({ error });
    }
});
exports.getInveart = getInveart;
const getInveartByClave = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield (0, connection_1.dbConnection)();
        if (!pool) {
            res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
            return;
        }
        const { clave } = req.query;
        const result = yield pool.query(querys_1.querys.getByClave, [clave]);
        const product = result.rows[0];
        res.json({
            product
        });
    }
    catch (error) {
        console.log({ error });
    }
});
exports.getInveartByClave = getInveartByClave;
const getInveartById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield (0, connection_1.dbConnection)();
        if (!pool) {
            res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
            return;
        }
        const { idinvearts } = req.query;
        const result = yield pool.query(querys_1.querys.getById, [idinvearts]);
        const product = result.rows[0];
        res.json({
            product
        });
    }
    catch (error) {
        console.log({ error });
    }
});
exports.getInveartById = getInveartById;
const insertInventoryDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield (0, connection_1.dbConnection)();
        if (!client) {
            res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
            return;
        }
        const postInventoryDataArray = req.body;
        // Validación de la estructura de los datos recibidos
        if (!Array.isArray(postInventoryDataArray)) {
            res.status(400).json({ error: 'El cuerpo de la solicitud debe ser un arreglo de objetos' });
            return;
        }
        try {
            yield client.query('BEGIN');
            const insertFunctionQuery = `
                SELECT insert_inventario_detalles($1::jsonb)
            `;
            yield client.query(insertFunctionQuery, [JSON.stringify(postInventoryDataArray)]);
            yield client.query('COMMIT');
            res.status(201).json({ message: 'Datos insertados exitosamente' });
        }
        catch (error) {
            console.log({ error });
            yield client.query('ROLLBACK');
            res.status(500).json({ error: 'Error al insertar los datos', details: error.message });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error en el servidor', details: error.message });
    }
});
exports.insertInventoryDetails = insertInventoryDetails;
//# sourceMappingURL=inveart.js.map