"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductCodebar = exports.updateProduct = exports.getProducByCodebar = exports.getProductById = exports.getProductByNoArticulo = exports.getProductByClave = exports.getTotalProducts = exports.getProducts = void 0;
const connection_1 = require("../database/connection");
const productQuery_1 = require("../querys/productQuery");
const identifyBarcodeType_1 = require("../utils/identifyBarcodeType");
const getSession_1 = require("../utils/Redis/getSession");
// Module 1 - Inventory
const getProducts = async (req, res, next) => {
    // Get session from REDIS.
    const sessionId = req.sessionID;
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        return res.status(401).json({ error: 'Sesion terminada' });
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await (0, connection_1.getGlobalPool)(connection);
    try {
        const { limit, page } = req.query;
        const result = await pool.query(productQuery_1.productQuerys.getProducts, [page, limit]);
        const products = result.rows;
        res.json({
            total: products.length,
            products
        });
    }
    catch (error) {
        res.status(500).send(error.message);
        return next(error);
    }
};
exports.getProducts = getProducts;
const getTotalProducts = async (req, res, next) => {
    // Get session from REDIS.
    const sessionId = req.sessionID;
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        return res.status(401).json({ error: 'Sesion terminada' });
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await (0, connection_1.getGlobalPool)(connection);
    try {
        const result = await pool.query(productQuery_1.productQuerys.getTotalProducts);
        const total = result.rows[0].count;
        res.json({
            total
        });
    }
    catch (error) {
        res.status(500).send(error.message);
        return next(error);
    }
};
exports.getTotalProducts = getTotalProducts;
const getProductByClave = async (req, res, next) => {
    // Get session from REDIS.
    const sessionId = req.sessionID;
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        return res.status(401).json({ error: 'Sesion terminada' });
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await (0, connection_1.getGlobalPool)(connection);
    try {
        const { clave } = req.query;
        const result = await pool.query(productQuery_1.productQuerys.getProductByClave, [clave]);
        const product = result.rows;
        res.json({ product });
    }
    catch (error) {
        res.status(500).send(error.message);
        return next(error);
    }
};
exports.getProductByClave = getProductByClave;
const getProductById = async (req, res, next) => {
    // Get session from REDIS.
    const sessionId = req.sessionID;
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        return res.status(401).json({ error: 'Sesion terminada' });
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await (0, connection_1.getGlobalPool)(connection);
    try {
        const { idinvearts } = req.query;
        const result = await pool.query(productQuery_1.productQuerys.getProductById, [idinvearts]);
        const product = result.rows[0];
        res.json({ product });
    }
    catch (error) {
        res.status(500).send(error.message);
        return next(error);
    }
};
exports.getProductById = getProductById;
const getProducByCodebar = async (req, res, next) => {
    // Get session from REDIS.
    const sessionId = req.sessionID;
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        return res.status(401).json({ error: 'Sesion terminada' });
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await (0, connection_1.getGlobalPool)(connection);
    try {
        const { codbarras } = req.query;
        let codbar = codbarras;
        const identifycodebarType = (0, identifyBarcodeType_1.identifyBarcodeType)(codbar);
        if (identifycodebarType === "UPC-A convertido a EAN-13") {
            codbar = codbar?.substring(1);
        }
        const result = await pool.query(productQuery_1.productQuerys.getProductByCodebar, [codbar]);
        const product = result.rows;
        res.json({ product });
    }
    catch (error) {
        res.status(500).send(error.message);
        return next(error);
    }
};
exports.getProducByCodebar = getProducByCodebar;
const getProductByNoArticulo = async (req, res, next) => {
    // Get session from REDIS.
    const sessionId = req.sessionID;
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        return res.status(401).json({ error: 'Sesion terminada' });
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await (0, connection_1.getGlobalPool)(connection);
    try {
        const { noarticulo } = req.query;
        const result = await pool.query(productQuery_1.productQuerys.getProductByNoarticulo, [noarticulo]);
        const product = result.rows;
        res.json({ product });
    }
    catch (error) {
        res.status(500).send(error.message);
        return next(error);
    }
};
exports.getProductByNoArticulo = getProductByNoArticulo;
const updateProduct = async (req, res, next) => {
    // Get session from REDIS.
    const sessionId = req.sessionID;
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        return res.status(401).json({ error: 'Sesion terminada' });
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await (0, connection_1.getGlobalPool)(connection);
    const client = await pool.connect();
    if (!client) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
        return;
    }
    try {
        const { ...updateFields } = req.body;
        const { idinvearts } = req.params;
        if (!idinvearts) {
            return res.status(400).json({ error: 'El campo idinvearts es requerido' });
        }
        const setClauses = Object.keys(updateFields)
            .map((key, index) => `${key} = $${index + 2}`)
            .join(', ');
        const values = [idinvearts, ...Object.values(updateFields)];
        const query = productQuery_1.productQuerys.updateProduct.replace('$SET_CLAUSES', setClauses);
        await client.query('BEGIN');
        await client.query(query, values);
        await client.query('COMMIT');
        res.json({ success: true, message: 'Producto actualizado correctamente' });
    }
    catch (error) {
        await client.query('ROLLBACK');
        res.status(500).send(error.message);
        return next(error);
    }
    finally {
        client.release();
    }
};
exports.updateProduct = updateProduct;
const updateProductCodebar = async (req, res, next) => {
    // Get session from REDIS.
    const sessionId = req.sessionID;
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        return res.status(401).json({ error: 'Sesion terminada' });
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await (0, connection_1.getGlobalPool)(connection);
    const client = await pool.connect();
    if (!client) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
        return;
    }
    try {
        const { codbarras } = req.body;
        const { idinvearts } = req.params;
        let codbar = codbarras;
        if (!idinvearts) {
            return res.status(400).json({ error: 'El campo idinvearts es requerido' });
        }
        const identifycodebarType = (0, identifyBarcodeType_1.identifyBarcodeType)(codbar);
        if (identifycodebarType === "UPC-A convertido a EAN-13") {
            codbar = codbar?.substring(1);
        }
        await client.query('BEGIN');
        await client.query(productQuery_1.productQuerys.updateCodebarProduct, [codbar, idinvearts]);
        await client.query('COMMIT');
        res.json({ success: true, message: 'Producto actualizado correctamente' });
    }
    catch (error) {
        await client.query('ROLLBACK');
        res.status(500).send(error.message);
        return next(error);
    }
    finally {
        client.release();
    }
};
exports.updateProductCodebar = updateProductCodebar;
//# sourceMappingURL=product.js.map