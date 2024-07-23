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
exports.deleteAllProductsInBag = exports.getTotalProductsInBag = exports.deletePoductFromBag = exports.updatePoductFromBag = exports.inserPoductToBag = exports.getBag = void 0;
const connection_1 = require("../database/connection");
const bagQuerys_1 = require("../querys/bagQuerys");
const getBag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield (0, connection_1.dbConnection)();
        if (!pool) {
            res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
            return;
        }
        const { limit, page, option } = req.query;
        const idusrmob = req.idusrmob;
        const result = yield pool.query(bagQuerys_1.bagQuerys.getBag, [option, idusrmob, page, limit]);
        const products = result.rows;
        res.json({
            bag: products
        });
    }
    catch (error) {
        console.log({ error });
        res.status(500).send(error.message);
    }
});
exports.getBag = getBag;
const inserPoductToBag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pool = yield (0, connection_1.dbConnection)();
    const client = yield pool.connect();
    if (!client) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
        return;
    }
    const { idinvearts, codbarras, unidad, cantidad, precio1: precio, opcion } = req.body;
    const idusrmob = req.idusrmob;
    const productBody = [idinvearts, codbarras, unidad, cantidad, precio, idusrmob, opcion];
    try {
        yield client.query('BEGIN');
        yield client.query(bagQuerys_1.bagQuerys.addProductToBag, productBody);
        yield client.query('COMMIT');
        res.status(201).json({ message: 'Datos insertados exitosamente' });
    }
    catch (error) {
        yield client.query('ROLLBACK');
        console.error('Error:', error);
        res.status(500).json({ error: 'Error al insertar los datos', details: error.message });
    }
    finally {
        client.release();
    }
});
exports.inserPoductToBag = inserPoductToBag;
const updatePoductFromBag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pool = yield (0, connection_1.dbConnection)();
    const client = yield pool.connect();
    if (!client) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
        return;
    }
    const { idenlacemob, cantidad } = req.body;
    try {
        yield client.query('BEGIN');
        yield client.query(bagQuerys_1.bagQuerys.updateProductFromBag, [cantidad, idenlacemob]);
        yield client.query('COMMIT');
        res.status(201).json({ message: 'Datos insertados exitosamente' });
    }
    catch (error) {
        yield client.query('ROLLBACK');
        console.error('Error:', error);
        res.status(500).json({ error: 'Error al insertar los datos', details: error.message });
    }
    finally {
        client.release();
    }
});
exports.updatePoductFromBag = updatePoductFromBag;
const deletePoductFromBag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pool = yield (0, connection_1.dbConnection)();
    const client = yield pool.connect();
    if (!client) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
        return;
    }
    const { idenlacemob } = req.params;
    try {
        yield client.query('BEGIN');
        yield client.query(bagQuerys_1.bagQuerys.deleteProductFromBag, [idenlacemob]);
        yield client.query('COMMIT');
        res.status(201).json({ message: 'Datos insertados exitosamente' });
    }
    catch (error) {
        yield client.query('ROLLBACK');
        console.error('Error:', error);
        res.status(500).json({ error: 'Error al insertar los datos', details: error.message });
    }
    finally {
        client.release();
    }
});
exports.deletePoductFromBag = deletePoductFromBag;
const getTotalProductsInBag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield (0, connection_1.dbConnection)();
        if (!pool) {
            res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
            return;
        }
        const { opcion } = req.query;
        const result = yield pool.query(bagQuerys_1.bagQuerys.getTotalProductsInBag, [opcion]);
        const totalproducts = result.rows[0].count;
        res.json({
            total: totalproducts
        });
    }
    catch (error) {
        console.log({ error });
        res.status(500).send(error.message);
    }
});
exports.getTotalProductsInBag = getTotalProductsInBag;
const deleteAllProductsInBag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pool = yield (0, connection_1.dbConnection)();
    const client = yield pool.connect();
    if (!client) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
        return;
    }
    const idusrmob = req.idusrmob;
    const { opcion } = req.query;
    try {
        yield client.query('BEGIN');
        yield client.query(bagQuerys_1.bagQuerys.deleteAllProductsInBag, [idusrmob, Number(opcion)]);
        yield client.query('COMMIT');
        res.status(201).json({ message: 'Datos eliminados exitosamente' });
    }
    catch (error) {
        yield client.query('ROLLBACK');
        console.error('Error:', error);
        res.status(500).json({ error: 'Error al insertar los datos', details: error.message });
    }
    finally {
        client.release();
    }
});
exports.deleteAllProductsInBag = deleteAllProductsInBag;
//# sourceMappingURL=bag.js.map