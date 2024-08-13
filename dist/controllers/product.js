"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIdinveartsProduct = exports.getProductByEnlacemob = exports.getUnits = exports.getProductsSellsFromFamily = exports.getTotalClassesSells = exports.getTotalProductsSells = exports.getProductsSells = exports.updateProductCodebar = exports.updateProduct = exports.getProducByCodebar = exports.getProductById = exports.getProductByNoArticulo = exports.getProductByClave = exports.getTotalProducts = exports.getProducts = void 0;
const connection_1 = require("../database/connection");
const productQuery_1 = require("../querys/productQuery");
const identifyBarcodeType_1 = require("../utils/identifyBarcodeType");
// Module 1 - Inventory
const getProducts = async (req, res) => {
    const idusrmob = req.idusrmob;
    if (!idusrmob) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
        return;
    }
    ;
    const pool = await (0, connection_1.dbConnection)({ idusrmob });
    console.log({ pool });
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
        console.log({ error });
        res.status(500).send(error.message);
    }
};
exports.getProducts = getProducts;
const getTotalProducts = async (req, res) => {
    const idusrmob = req.idusrmob;
    if (!idusrmob) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
        return;
    }
    ;
    const pool = await (0, connection_1.dbConnection)({ idusrmob });
    try {
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
    const idusrmob = req.idusrmob;
    if (!idusrmob) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
        return;
    }
    ;
    const pool = await (0, connection_1.dbConnection)({ idusrmob });
    try {
        const { clave } = req.query;
        const result = await pool.query(productQuery_1.productQuerys.getProductByClave, [clave]);
        const product = result.rows;
        res.json({ product });
    }
    catch (error) {
        console.log({ error });
        res.status(500).send(error.message);
    }
};
exports.getProductByClave = getProductByClave;
const getProductById = async (req, res) => {
    const idusrmob = req.idusrmob;
    if (!idusrmob) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
        return;
    }
    ;
    const pool = await (0, connection_1.dbConnection)({ idusrmob });
    try {
        const { idinvearts } = req.query;
        const result = await pool.query(productQuery_1.productQuerys.getProductById, [idinvearts]);
        const product = result.rows[0];
        res.json({ product });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.getProductById = getProductById;
const getProducByCodebar = async (req, res) => {
    const idusrmob = req.idusrmob;
    if (!idusrmob) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
        return;
    }
    ;
    const pool = await (0, connection_1.dbConnection)({ idusrmob });
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
        console.error('Error:', error);
        res.status(500).send(error.message);
    }
};
exports.getProducByCodebar = getProducByCodebar;
const getProductByNoArticulo = async (req, res) => {
    const idusrmob = req.idusrmob;
    if (!idusrmob) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
        return;
    }
    ;
    const pool = await (0, connection_1.dbConnection)({ idusrmob });
    try {
        const { noarticulo } = req.query;
        const result = await pool.query(productQuery_1.productQuerys.getProductByNoarticulo, [noarticulo]);
        const product = result.rows;
        res.json({ product });
    }
    catch (error) {
        console.log({ error });
        res.status(500).send(error.message);
    }
};
exports.getProductByNoArticulo = getProductByNoArticulo;
const updateProduct = async (req, res) => {
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
        console.error('Error:', error);
        res.status(500).send(error.message);
    }
    finally {
        client.release();
    }
};
exports.updateProduct = updateProduct;
const updateProductCodebar = async (req, res) => {
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
        console.error('Error:', error);
        res.status(500).send(error.message);
    }
    finally {
        client.release();
    }
};
exports.updateProductCodebar = updateProductCodebar;
// Module 2 - Sells
const getProductsSells = async (req, res) => {
    console.log("getProductsSells!! ----------------------------------------------------------------------");
    //This controller show just the families not the products.
    const idusrmob = req.idusrmob;
    if (!idusrmob) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
        return;
    }
    const pool = await (0, connection_1.dbConnection)({ idusrmob, database: "mercado" });
    try {
        const { limit, page } = req.query;
        const result = await pool.query(productQuery_1.productQuerys.getProductsSells, [page, limit]);
        const products = result.rows.map((product) => {
            if (product.imagen) {
                product.imagen = Buffer.from(product.imagen, 'base64').toString();
            }
            return product;
        });
        res.json({
            products
        });
    }
    catch (error) {
        console.log({ error });
        res.status(500).send(error.message);
    }
};
exports.getProductsSells = getProductsSells;
const getProductsSellsFromFamily = async (req, res) => {
    //This controller show just the clases and capas.
    const idusrmob = req.idusrmob;
    if (!idusrmob) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
        return;
    }
    ;
    const pool = await (0, connection_1.dbConnection)({ idusrmob, database: "mercado" });
    try {
        const { cvefamilia } = req.query;
        const result = await pool.query(productQuery_1.productQuerys.getProductsSellsFromFamily, [cvefamilia]);
        const products = result.rows;
        res.json({
            products
        });
    }
    catch (error) {
        console.log({ error });
        res.status(500).send(error.message);
    }
};
exports.getProductsSellsFromFamily = getProductsSellsFromFamily;
const getProductByEnlacemob = async (req, res) => {
    const idusrmob = req.idusrmob;
    if (!idusrmob) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
        return;
    }
    const pool = await (0, connection_1.dbConnection)({ idusrmob, database: "mercado" });
    const client = await pool.connect();
    try {
        const { idinvearts, idinveclas, capa } = req.query;
        const result = await client.query(productQuery_1.productQuerys.getProductByEnlacemob, [idinvearts, idinveclas, capa]);
        const product = result.rows[0];
        res.json({ product });
    }
    catch (error) {
        console.log({ error });
        res.status(500).send(error.message);
    }
    finally {
        client.release();
    }
};
exports.getProductByEnlacemob = getProductByEnlacemob;
const getUnits = async (req, res) => {
    const idusrmob = req.idusrmob;
    if (!idusrmob) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
        return;
    }
    ;
    const pool = await (0, connection_1.dbConnection)({ idusrmob, database: "mercado" });
    try {
        const result = await pool.query(productQuery_1.productQuerys.getUnits);
        const units = result.rows;
        res.json({ units });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.getUnits = getUnits;
const getTotalProductsSells = async (req, res) => {
    const idusrmob = req.idusrmob;
    if (!idusrmob) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
        return;
    }
    ;
    const pool = await (0, connection_1.dbConnection)({ idusrmob, database: "mercado" });
    try {
        const result = await pool.query(productQuery_1.productQuerys.getTotalProductsSells);
        const total = result.rows[0].total;
        res.json({
            total
        });
    }
    catch (error) {
        console.log({ "error-getTotalClassesSells": error });
        res.status(500).send(error.message);
    }
};
exports.getTotalProductsSells = getTotalProductsSells;
const getTotalClassesSells = async (req, res) => {
    const idusrmob = req.idusrmob;
    if (!idusrmob) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
        return;
    }
    ;
    const pool = await (0, connection_1.dbConnection)({ idusrmob, database: "mercado" });
    const { cvefamilia } = req.query;
    try {
        const result = await pool.query(productQuery_1.productQuerys.getTotalClassesSells, [cvefamilia]);
        const total = result.rows[0].count;
        res.json({
            total
        });
    }
    catch (error) {
        console.log({ "error-getTotalClassesSells": error });
        res.status(500).send(error.message);
    }
};
exports.getTotalClassesSells = getTotalClassesSells;
//TEMPORAL
const getIdinveartsProduct = async (req, res) => {
    const idusrmob = req.idusrmob;
    if (!idusrmob) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
        return;
    }
    const pool = await (0, connection_1.dbConnection)({ idusrmob, database: "mercado" });
    const client = await pool.connect(); // Obtener una conexión del pool
    try {
        const { cvefamilia } = req.query;
        const result = await client.query(productQuery_1.productQuerys.getIdinveartsProduct, [cvefamilia]);
        const product = result.rows[0];
        res.json({ product });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
    finally {
        client.release();
    }
};
exports.getIdinveartsProduct = getIdinveartsProduct;
//# sourceMappingURL=product.js.map