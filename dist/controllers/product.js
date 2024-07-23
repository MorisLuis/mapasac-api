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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductCodebar = exports.updateProduct = exports.getProducByCodebar = exports.getProductById = exports.getProductByClave = exports.getTotalProducts = exports.getProducts = void 0;
const connection_1 = require("../database/connection");
const productQuery_1 = require("../querys/productQuery");
const identifyBarcodeType_1 = require("../utils/identifyBarcodeType");
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield (0, connection_1.dbConnection)();
        if (!pool) {
            res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
            return;
        }
        const { limit, page } = req.query;
        const result = yield pool.query(productQuery_1.productQuerys.getProducts, [page, limit]);
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
});
exports.getProducts = getProducts;
const getTotalProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield (0, connection_1.dbConnection)();
        if (!pool) {
            res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
            return;
        }
        const result = yield pool.query(productQuery_1.productQuerys.getTotalProducts);
        const total = result.rows[0].count;
        res.json({
            total
        });
    }
    catch (error) {
        console.log({ error });
        res.status(500).send(error.message);
    }
});
exports.getTotalProducts = getTotalProducts;
const getProductByClave = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield (0, connection_1.dbConnection)();
        if (!pool) {
            res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
            return;
        }
        const { clave } = req.query;
        const result = yield pool.query(productQuery_1.productQuerys.getProductByClave, [clave]);
        const product = result.rows[0];
        res.json({
            product
        });
    }
    catch (error) {
        console.log({ error });
        res.status(500).send(error.message);
    }
});
exports.getProductByClave = getProductByClave;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield (0, connection_1.dbConnection)();
        if (!pool) {
            res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
            return;
        }
        const { idinvearts } = req.query;
        console.log({ idinvearts });
        const result = yield pool.query(productQuery_1.productQuerys.getProductById, [idinvearts]);
        const product = result.rows[0];
        res.json({
            product
        });
    }
    catch (error) {
        console.log({ error });
    }
});
exports.getProductById = getProductById;
const getProducByCodebar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield (0, connection_1.dbConnection)();
        if (!pool) {
            res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
            return;
        }
        const { codbarras } = req.query;
        const result = yield pool.query(productQuery_1.productQuerys.getProductByCodebar, [codbarras]);
        const product = result.rows[0];
        res.json({ product });
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.getProducByCodebar = getProducByCodebar;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pool = yield (0, connection_1.dbConnection)();
    const client = yield pool.connect();
    if (!client) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
        return;
    }
    try {
        const updateFields = __rest(req.body, []);
        const { idinvearts } = req.params;
        if (!idinvearts) {
            return res.status(400).json({ error: 'El campo idinvearts es requerido' });
        }
        const setClauses = Object.keys(updateFields)
            .map((key, index) => `${key} = $${index + 2}`)
            .join(', ');
        const values = [idinvearts, ...Object.values(updateFields)];
        const query = productQuery_1.productQuerys.updateProduct.replace('$SET_CLAUSES', setClauses);
        yield client.query('BEGIN');
        yield client.query(query, values);
        yield client.query('COMMIT');
        res.json({ success: true, message: 'Producto actualizado correctamente' });
    }
    catch (error) {
        yield client.query('ROLLBACK');
        console.error('Error:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
    finally {
        client.release();
    }
});
exports.updateProduct = updateProduct;
const updateProductCodebar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pool = yield (0, connection_1.dbConnection)();
    const client = yield pool.connect();
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
        let isEAN13 = false;
        if (codbar) {
            isEAN13 = (0, identifyBarcodeType_1.verifyIfIsEAN13)(codbar);
        }
        if (isEAN13) {
            codbar = codbar === null || codbar === void 0 ? void 0 : codbar.substring(1);
        }
        yield client.query('BEGIN');
        yield client.query(productQuery_1.productQuerys.updateCodebarProduct, [codbar, idinvearts]);
        yield client.query('COMMIT');
        res.json({ success: true, message: 'Producto actualizado correctamente' });
    }
    catch (error) {
        yield client.query('ROLLBACK');
        console.error('Error:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
    finally {
        client.release();
    }
});
exports.updateProductCodebar = updateProductCodebar;
//# sourceMappingURL=product.js.map