"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchClients = exports.searchProductInBag = exports.searchProduct = void 0;
const connection_1 = require("../database/connection");
const searchQuery_1 = require("../querys/searchQuery");
const getSession_1 = require("../utils/Redis/getSession");
const searchProduct = async (req, res) => {
    // Get session from REDIS.
    const sessionId = req.sessionID;
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        return res.status(401).json({ error: 'Sesion terminada' });
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await (0, connection_1.getGlobalPool)(connection);
    try {
        const { term } = req.query;
        let searchTerm;
        if (!term) {
            searchTerm = "a";
        }
        else {
            searchTerm = term;
        }
        const result = await pool.query(searchQuery_1.searchQuerys.searchProduct, [searchTerm]);
        const products = result.rows;
        res.json({
            products
        });
    }
    catch (error) {
        console.log({ error });
        return res.status(500).json({ error: error.message || 'Unexpected error' });
    }
};
exports.searchProduct = searchProduct;
const searchProductInBag = async (req, res) => {
    // Get session from REDIS.
    const sessionId = req.sessionID;
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        return res.status(401).json({ error: 'Sesion terminada' });
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await (0, connection_1.getGlobalPool)(connection);
    try {
        const { term, opcion } = req.query;
        const idusrmob = req.idusrmob;
        let searchTerm;
        if (!term) {
            searchTerm = "";
        }
        else {
            searchTerm = term;
        }
        const result = await pool.query(opcion === '2' ? searchQuery_1.searchQuerys.searchProductInBagSells : searchQuery_1.searchQuerys.searchProductInBag, [opcion, idusrmob, searchTerm]);
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
exports.searchProductInBag = searchProductInBag;
const searchClients = async (req, res) => {
    // Get session from REDIS.
    const sessionId = req.sessionID;
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        return res.status(401).json({ error: 'Sesion terminada' });
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await (0, connection_1.getGlobalPool)(connection);
    try {
        const { term } = req.query;
        let searchTerm;
        if (!term) {
            searchTerm = "a";
        }
        else {
            searchTerm = term;
        }
        const result = await pool.query(searchQuery_1.searchQuerys.searchClients, [searchTerm]);
        const clients = result.rows;
        res.json({
            clients
        });
    }
    catch (error) {
        console.log({ error });
        return res.status(500).json({ error: error.message || 'Unexpected error' });
    }
};
exports.searchClients = searchClients;
//# sourceMappingURL=search.js.map