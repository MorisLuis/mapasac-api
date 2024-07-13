"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertInventoryDetails = exports.getInveartById = exports.getInveartByClave = exports.getInveart = void 0;
const connection_1 = require("../database/connection");
const querys_1 = require("../querys");
const getInveart = async (req, res) => {
    try {
        const pool = await (0, connection_1.dbConnection)();
        if (!pool) {
            res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
            return;
        }
        const { limit, page } = req.query;
        const result = await pool.query(querys_1.querys.inveart, [page, limit]);
        const products = result.rows;
        res.json({
            total: products.length,
            products
        });
    }
    catch (error) {
        console.log({ error });
    }
};
exports.getInveart = getInveart;
const getInveartByClave = async (req, res) => {
    try {
        const pool = await (0, connection_1.dbConnection)();
        if (!pool) {
            res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
            return;
        }
        const { clave } = req.query;
        const result = await pool.query(querys_1.querys.getByClave, [clave]);
        const product = result.rows[0];
        res.json({
            product
        });
    }
    catch (error) {
        console.log({ error });
    }
};
exports.getInveartByClave = getInveartByClave;
const getInveartById = async (req, res) => {
    try {
        const pool = await (0, connection_1.dbConnection)();
        if (!pool) {
            res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
            return;
        }
        const { idinvearts } = req.query;
        const result = await pool.query(querys_1.querys.getById, [idinvearts]);
        const product = result.rows[0];
        res.json({
            product
        });
    }
    catch (error) {
        console.log({ error });
    }
};
exports.getInveartById = getInveartById;
const insertInventoryDetails = async (req, res) => {
    try {
        const client = await (0, connection_1.dbConnection)();
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
            await client.query('BEGIN');
            const insertFunctionQuery = `
                SELECT insert_inventario_detalles($1::jsonb)
            `;
            await client.query(insertFunctionQuery, [JSON.stringify(postInventoryDataArray)]);
            await client.query('COMMIT');
            res.status(201).json({ message: 'Datos insertados exitosamente' });
        }
        catch (error) {
            console.log({ error });
            await client.query('ROLLBACK');
            res.status(500).json({ error: 'Error al insertar los datos', details: error.message });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error en el servidor', details: error.message });
    }
};
exports.insertInventoryDetails = insertInventoryDetails;
//# sourceMappingURL=inveart.js.map