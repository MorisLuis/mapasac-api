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
exports.updateProductCodebar = exports.getProducByCodebar = void 0;
const connection_1 = require("../database/connection");
const querys_1 = require("../querys");
const getProducByCodebar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield (0, connection_1.dbConnection)();
        if (!client) {
            res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
            return;
        }
        const { codbarras } = req.query;
        const result = yield client.query(querys_1.querys.getByCodebar, [codbarras]);
        const product = result.rows[0];
        res.json({ product });
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.getProducByCodebar = getProducByCodebar;
const updateProductCodebar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield (0, connection_1.dbConnection)();
        if (!client) {
            res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
            return;
        }
        const { codbarras } = req.body;
        const { idinvearts } = req.query;
        if (!codbarras || !idinvearts) {
            res.status(400).json({ error: 'Parámetros inválidos' });
            return;
        }
        const result = yield client.query(querys_1.querys.updateCodbar, [codbarras, idinvearts]);
        if (result.rowCount === 0) {
            res.status(404).json({ error: 'Producto no encontrado' });
            return;
        }
        res.json({ message: 'Producto actualizado exitosamente' });
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.updateProductCodebar = updateProductCodebar;
//# sourceMappingURL=codebar.js.map