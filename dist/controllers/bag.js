"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalPriceBag = exports.deleteAllProductsInBag = exports.getTotalProductsInBag = exports.deletePoductFromBag = exports.updatePoductFromBag = exports.inserPoductToBag = exports.getBag = void 0;
const connection_1 = require("../database/connection");
const bagQuerys_1 = require("../querys/bagQuerys");
const getSession_1 = require("../utils/Redis/getSession");
const getBag = async (req, res) => {
    const { mercado } = req.query;
    // Get session from REDIS.
    const sessionId = req.sessionID;
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        return res.status(400).json({ error: 'Sesion terminada' });
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await (0, connection_1.getGlobalPool)(connection);
    try {
        const { limit, page, option } = req.query;
        const result = await pool.query(mercado === 'true' ? bagQuerys_1.bagQuerys.getBagSells : bagQuerys_1.bagQuerys.getBag, [option, idusrmob, page, limit]);
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
    const { mercado } = req.query;
    // Get session from REDIS.
    const sessionId = req.sessionID;
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        return res.status(400).json({ error: 'Sesion terminada' });
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await (0, connection_1.getGlobalPool)(connection);
    const client = await pool.connect();
    if (!client) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
        return;
    }
    ;
    try {
        const { idinvearts, codbarras, unidad, cantidad, precio1, precio, opcion, capa, idinveclas } = req.body;
        const precioFinal = precio1 !== undefined ? precio1 : precio;
        const productBodySell = [
            idinvearts,
            unidad,
            cantidad,
            precioFinal,
            idusrmob,
            opcion,
            codbarras !== undefined ? codbarras : '',
            idinveclas !== undefined ? idinveclas : 0,
            capa !== undefined ? capa : ''
        ];
        const productBody = [
            idinvearts,
            unidad,
            cantidad,
            precioFinal,
            idusrmob,
            opcion,
            codbarras !== undefined ? codbarras : ''
        ];
        await client.query('BEGIN');
        await client.query(mercado === 'true' ? bagQuerys_1.bagQuerys.addProductSellToBag : bagQuerys_1.bagQuerys.addProductToBag, mercado === 'true' ? productBodySell : productBody);
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
    // Get session from REDIS.
    const sessionId = req.sessionID;
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        return res.status(400).json({ error: 'Sesion terminada' });
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await (0, connection_1.getGlobalPool)(connection);
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
    // Get session from REDIS.
    const sessionId = req.sessionID;
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        return res.status(400).json({ error: 'Sesion terminada' });
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await (0, connection_1.getGlobalPool)(connection);
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
    // Get session from REDIS.
    const sessionId = req.sessionID;
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        return res.status(400).json({ error: 'Sesion terminada' });
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await (0, connection_1.getGlobalPool)(connection);
    try {
        const { opcion } = req.query;
        const result = await pool.query(bagQuerys_1.bagQuerys.getTotalProductsInBag, [opcion, idusrmob]);
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
    // Get session from REDIS.
    const sessionId = req.sessionID;
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        return res.status(400).json({ error: 'Sesion terminada' });
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await (0, connection_1.getGlobalPool)(connection);
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
const getTotalPriceBag = async (req, res) => {
    const sessionId = req.sessionID;
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        return res.status(400).json({ error: 'Sesion terminada' });
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await (0, connection_1.getGlobalPool)(connection);
    try {
        const { opcion } = req.query;
        const result = await pool.query(bagQuerys_1.bagQuerys.getTotalPriceBag, [opcion, idusrmob]);
        const totalproducts = result.rows[0].total;
        res.json({
            total: totalproducts
        });
    }
    catch (error) {
        console.log({ error });
        res.status(500).send(error.message);
    }
};
exports.getTotalPriceBag = getTotalPriceBag;
//# sourceMappingURL=bag.js.map