"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalProductsSellsRestaurant = exports.getProductSellsRestaurantDetails = exports.getProductsSellsRestaurant = exports.getIdinveartsProduct = exports.getProductByEnlacemob = exports.getUnits = exports.getProductsSellsFromFamily = exports.getTotalClassesSells = exports.getTotalProductsSells = exports.getProductsSells = void 0;
const getSession_1 = require("../utils/Redis/getSession");
const connection_1 = require("../database/connection");
const productSellsQuery_1 = require("../querys/products/productSellsQuery");
// Module 2 - Sells
const getProductsSells = async (req, res) => {
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
        const result = await pool.query(productSellsQuery_1.productSellsQuerys.getProductsSells, [page, limit]);
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
    // Get session from REDIS.
    const sessionId = req.sessionID;
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        return res.status(401).json({ error: 'Sesion terminada' });
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await (0, connection_1.getGlobalPool)(connection);
    try {
        const { cvefamilia } = req.query;
        const result = await pool.query(productSellsQuery_1.productSellsQuerys.getProductsSellsFromFamily, [cvefamilia]);
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
    // Get session from REDIS.
    const sessionId = req.sessionID;
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        return res.status(401).json({ error: 'Sesion terminada' });
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await (0, connection_1.getGlobalPool)(connection);
    try {
        const { idinvearts, idinveclas, capa } = req.query;
        const result = await pool.query(productSellsQuery_1.productSellsQuerys.getProductByEnlacemob, [idinvearts, idinveclas, capa]);
        const product = result.rows[0];
        res.json({ product });
    }
    catch (error) {
        console.log({ error });
        res.status(500).send(error.message);
    }
};
exports.getProductByEnlacemob = getProductByEnlacemob;
const getUnits = async (req, res) => {
    // Get session from REDIS.
    const sessionId = req.sessionID;
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        return res.status(401).json({ error: 'Sesion terminada' });
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await (0, connection_1.getGlobalPool)(connection);
    try {
        const result = await pool.query(productSellsQuery_1.productSellsQuerys.getUnits);
        const units = result.rows;
        res.json({ units });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.getUnits = getUnits;
const getTotalProductsSells = async (req, res) => {
    // Get session from REDIS.
    const sessionId = req.sessionID;
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        return res.status(401).json({ error: 'Sesion terminada' });
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await (0, connection_1.getGlobalPool)(connection);
    try {
        const result = await pool.query(productSellsQuery_1.productSellsQuerys.getTotalProductsSells);
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
    // Get session from REDIS.
    const sessionId = req.sessionID;
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        return res.status(401).json({ error: 'Sesion terminada' });
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await (0, connection_1.getGlobalPool)(connection);
    const { cvefamilia } = req.query;
    try {
        const result = await pool.query(productSellsQuery_1.productSellsQuerys.getTotalClassesSells, [cvefamilia]);
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
    // Get session from REDIS.
    const sessionId = req.sessionID;
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        return res.status(401).json({ error: 'Sesion terminada' });
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await (0, connection_1.getGlobalPool)(connection);
    try {
        const { cvefamilia } = req.query;
        const result = await pool.query(productSellsQuery_1.productSellsQuerys.getIdinveartsProduct, [cvefamilia]);
        const product = result.rows[0];
        res.json({ product });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.getIdinveartsProduct = getIdinveartsProduct;
// Module 3 - Sells Restaurants
const getProductsSellsRestaurant = async (req, res) => {
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
        const result = await pool.query(productSellsQuery_1.productSellsQuerys.getProductsSellsRestaurant, [page, limit]);
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
exports.getProductsSellsRestaurant = getProductsSellsRestaurant;
const getProductSellsRestaurantDetails = async (req, res) => {
    //This controller show just the clases and capas.
    // Get session from REDIS.
    const sessionId = req.sessionID;
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        return res.status(401).json({ error: 'Sesion terminada' });
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await (0, connection_1.getGlobalPool)(connection);
    try {
        const { cvefamilia } = req.query;
        const result = await pool.query(productSellsQuery_1.productSellsQuerys.getProductSellsRestaurantDetails, [cvefamilia]);
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
exports.getProductSellsRestaurantDetails = getProductSellsRestaurantDetails;
const getTotalProductsSellsRestaurant = async (req, res) => {
    // Get session from REDIS.
    const sessionId = req.sessionID;
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        return res.status(401).json({ error: 'Sesion terminada' });
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await (0, connection_1.getGlobalPool)(connection);
    try {
        const result = await pool.query(productSellsQuery_1.productSellsQuerys.getTotalProductsSellsRestaurant);
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
exports.getTotalProductsSellsRestaurant = getTotalProductsSellsRestaurant;
//# sourceMappingURL=productSells.js.map