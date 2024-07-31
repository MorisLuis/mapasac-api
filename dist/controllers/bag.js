"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllProductsInBag = exports.getTotalProductsInBag = exports.deletePoductFromBag = exports.updatePoductFromBag = exports.inserPoductToBag = exports.getBag = void 0;
const connection_1 = require("../database/connection");
const bagQuerys_1 = require("../querys/bagQuerys");
const getBag = async (req, res) => {
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
        const { limit, page, option } = req.query;
        const result = await pool.query(bagQuerys_1.bagQuerys.getBag, [option, idusrmob, page, limit]);
        const products = result.rows;
        res.json({
            bag: products
        });
    }
    catch (error) {
        console.log({ error });
        res.status(500).send(error.message);
    }
};
exports.getBag = getBag;
const inserPoductToBag = async (req, res) => {
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
        const { idinvearts, codbarras, unidad, cantidad, precio1: precio, opcion } = req.body;
        const productBody = [idinvearts, codbarras, unidad, cantidad, precio, idusrmob, opcion];
        await client.query('BEGIN');
        await client.query(bagQuerys_1.bagQuerys.addProductToBag, productBody);
        await client.query('COMMIT');
        res.status(201).json({ message: 'Datos insertados exitosamente' });
    }
    catch (error) {
        await client.query('ROLLBACK');
        console.error('Error:', error);
        res.status(500).send(error.message);
    }
    finally {
        client.release();
    }
};
exports.inserPoductToBag = inserPoductToBag;
const updatePoductFromBag = async (req, res) => {
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
        const { idenlacemob, cantidad } = req.body;
        await client.query('BEGIN');
        await client.query(bagQuerys_1.bagQuerys.updateProductFromBag, [cantidad, idenlacemob]);
        await client.query('COMMIT');
        res.status(201).json({ message: 'Datos insertados exitosamente' });
    }
    catch (error) {
        await client.query('ROLLBACK');
        console.error('Error:', error);
        res.status(500).send(error.message);
    }
    finally {
        client.release();
    }
};
exports.updatePoductFromBag = updatePoductFromBag;
const deletePoductFromBag = async (req, res) => {
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
        const { idenlacemob } = req.params;
        await client.query('BEGIN');
        await client.query(bagQuerys_1.bagQuerys.deleteProductFromBag, [idenlacemob]);
        await client.query('COMMIT');
        res.status(201).json({ message: 'Datos insertados exitosamente' });
    }
    catch (error) {
        await client.query('ROLLBACK');
        console.error('Error:', error);
        res.status(500).send(error.message);
    }
    finally {
        client.release();
    }
};
exports.deletePoductFromBag = deletePoductFromBag;
const getTotalProductsInBag = async (req, res) => {
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
        const { opcion } = req.query;
        const result = await pool.query(bagQuerys_1.bagQuerys.getTotalProductsInBag, [opcion]);
        const totalproducts = result.rows[0].count;
        res.json({
            total: totalproducts
        });
    }
    catch (error) {
        console.log({ error });
        res.status(500).send(error.message);
    }
};
exports.getTotalProductsInBag = getTotalProductsInBag;
const deleteAllProductsInBag = async (req, res) => {
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
        const { opcion } = req.query;
        await client.query('BEGIN');
        await client.query(bagQuerys_1.bagQuerys.deleteAllProductsInBag, [idusrmob, Number(opcion)]);
        await client.query('COMMIT');
        res.status(201).json({ message: 'Datos eliminados exitosamente' });
    }
    catch (error) {
        await client.query('ROLLBACK');
        console.error('Error:', error);
        res.status(500).send(error.message);
    }
    finally {
        client.release();
    }
};
exports.deleteAllProductsInBag = deleteAllProductsInBag;
//# sourceMappingURL=bag.js.map