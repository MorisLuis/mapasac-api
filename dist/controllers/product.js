"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.getProducByCodebar = exports.getProductById = exports.getProductByClave = exports.getTotalProducts = exports.getProducts = void 0;
const connection_1 = require("../database/connection");
const productQuery_1 = require("../querys/productQuery");
const getProducts = async (req, res) => {
    try {
        const pool = await (0, connection_1.dbConnection)();
        if (!pool) {
            res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
            return;
        }
        const { limit, page } = req.query;
        const result = await pool.query(productQuery_1.productQuerys.getProducts, [page, limit]);
        const products = result.rows;
        res.json({
            total: products.length,
            products
        });
    }
    catch (error) {
        console.log({ error });
        res.status(500).send(error.message);
    }
};
exports.getProducts = getProducts;
const getTotalProducts = async (req, res) => {
    try {
        const pool = await (0, connection_1.dbConnection)();
        if (!pool) {
            res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
            return;
        }
        const result = await pool.query(productQuery_1.productQuerys.getTotalProducts);
        const total = result.rows[0].count;
        res.json({
            total
        });
    }
    catch (error) {
        console.log({ error });
        res.status(500).send(error.message);
    }
};
exports.getTotalProducts = getTotalProducts;
const getProductByClave = async (req, res) => {
    try {
        const pool = await (0, connection_1.dbConnection)();
        if (!pool) {
            res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
            return;
        }
        const { clave } = req.query;
        const result = await pool.query(productQuery_1.productQuerys.getProductByClave, [clave]);
        const product = result.rows[0];
        res.json({
            product
        });
    }
    catch (error) {
        console.log({ error });
        res.status(500).send(error.message);
    }
};
exports.getProductByClave = getProductByClave;
const getProductById = async (req, res) => {
    try {
        const pool = await (0, connection_1.dbConnection)();
        if (!pool) {
            res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
            return;
        }
        const { idinvearts } = req.query;
        const result = await pool.query(productQuery_1.productQuerys.getProductById, [idinvearts]);
        const product = result.rows[0];
        res.json({
            product
        });
    }
    catch (error) {
        console.log({ error });
    }
};
exports.getProductById = getProductById;
const getProducByCodebar = async (req, res) => {
    try {
        const pool = await (0, connection_1.dbConnection)();
        if (!pool) {
            res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
            return;
        }
        const { codbarras } = req.query;
        const result = await pool.query(productQuery_1.productQuerys.getProductByCodebar, [codbarras]);
        const product = result.rows[0];
        res.json({ product });
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
exports.getProducByCodebar = getProducByCodebar;
const updateProduct = async (req, res) => {
    try {
        const pool = await (0, connection_1.dbConnection)();
        if (!pool) {
            res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
            return;
        }
        const { ...updateFields } = req.body;
        const { idinvearts } = req.params;
        if (!idinvearts) {
            return res.status(400).json({ error: 'El campo idinvearts es requerido' });
        }
        // Construir el query dinámicamente.
        const setClauses = Object.keys(updateFields)
            .map((key, index) => `${key} = $${index + 2}`)
            .join(', ');
        const values = [idinvearts, ...Object.values(updateFields)];
        const query = productQuery_1.productQuerys.updateProduct.replace('$SET_CLAUSES', setClauses);
        await pool.query(query, values);
        res.json({ success: true, message: 'Producto actualizado correctamente' });
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
exports.updateProduct = updateProduct;
//# sourceMappingURL=product.js.map