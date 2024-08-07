"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProductInBag = exports.searchProduct = void 0;
const connection_1 = require("../database/connection");
const searchQuery_1 = require("../querys/searchQuery");
const searchProduct = async (req, res) => {
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
    finally {
        client.release();
    }
};
exports.searchProduct = searchProduct;
const searchProductInBag = async (req, res) => {
    const idusrmob = req.idusrmob;
    const { mercado } = req.query;
    if (!idusrmob) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
        return;
    }
    ;
    let pool;
    if (mercado === 'true') {
        pool = await (0, connection_1.dbConnection)({ idusrmob, database: "mercado" });
    }
    else {
        pool = await (0, connection_1.dbConnection)({ idusrmob });
    }
    const client = await pool.connect();
    if (!client) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
        return;
    }
    try {
        const { term, opcion } = req.query;
        const idusrmob = req.idusrmob;
        let searchTerm;
        if (!term) {
            searchTerm = "a";
        }
        else {
            searchTerm = term;
        }
        const result = await pool.query(mercado === 'true' ? searchQuery_1.searchQuerys.searchProductInBagSells : searchQuery_1.searchQuerys.searchProductInBag, [opcion, idusrmob, searchTerm]);
        const products = result.rows;
        res.json({
            products
        });
    }
    catch (error) {
        console.log({ error });
        res.status(500).send(error.message);
    }
    finally {
        client.release();
    }
};
exports.searchProductInBag = searchProductInBag;
//# sourceMappingURL=search.js.map