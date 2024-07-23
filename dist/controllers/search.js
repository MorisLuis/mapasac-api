"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProductInBag = exports.searchProduct = void 0;
const connection_1 = require("../database/connection");
const searchQuery_1 = require("../querys/searchQuery");
const searchProduct = async (req, res) => {
    try {
        const pool = await (0, connection_1.dbConnection)();
        if (!pool) {
            res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
            return;
        }
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
    try {
        const pool = await (0, connection_1.dbConnection)();
        if (!pool) {
            res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
            return;
        }
        const { term, opcion } = req.query;
        const idusrmob = req.idusrmob;
        let searchTerm;
        if (!term) {
            searchTerm = "a";
        }
        else {
            searchTerm = term;
        }
        const result = await pool.query(searchQuery_1.searchQuerys.searchProductInBag, [opcion, idusrmob, searchTerm]);
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
exports.searchProductInBag = searchProductInBag;
//# sourceMappingURL=search.js.map