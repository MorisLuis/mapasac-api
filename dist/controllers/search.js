"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProductInBag = exports.searchProduct = void 0;
const connection_1 = require("../database/connection");
const searchQuery_1 = require("../querys/searchQuery");
const searchProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield (0, connection_1.dbConnection)();
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
        const result = yield pool.query(searchQuery_1.searchQuerys.searchProduct, [searchTerm]);
        const products = result.rows;
        res.json({
            products
        });
    }
    catch (error) {
        console.log({ error });
        return res.status(500).json({ error: error.message || 'Unexpected error' });
    }
});
exports.searchProduct = searchProduct;
const searchProductInBag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield (0, connection_1.dbConnection)();
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
        const result = yield pool.query(searchQuery_1.searchQuerys.searchProductInBag, [opcion, idusrmob, searchTerm]);
        const products = result.rows;
        res.json({
            products
        });
    }
    catch (error) {
        console.log({ error });
        return res.status(500).json({ error: error.message || 'Unexpected error' });
    }
});
exports.searchProductInBag = searchProductInBag;
//# sourceMappingURL=search.js.map