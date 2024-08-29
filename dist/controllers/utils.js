"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.utilsController = exports.getClients = exports.getPaymentType = void 0;
const connection_1 = require("../database/connection");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const image_1 = require("../image");
const querys_1 = require("../querys/querys");
const getPaymentType = async (req, res) => {
    //This controller show just the families not the products.
    const idusrmob = req.idusrmob;
    if (!idusrmob) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
        return;
    }
    const pool = await (0, connection_1.dbConnection)({ idusrmob, database: "mercado" });
    try {
        const result = await pool.query(querys_1.querys.getPaymentType);
        const typePayments = result.rows;
        res.json({
            typePayments: typePayments
        });
    }
    catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        return res.status(500).json({ error: 'Error al conectar a la base de datos' });
    }
    try {
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
exports.getPaymentType = getPaymentType;
const getClients = async (req, res) => {
    //This controller show just the families not the products.
    const idusrmob = req.idusrmob;
    if (!idusrmob) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
        return;
    }
    const pool = await (0, connection_1.dbConnection)({ idusrmob });
    try {
        const { limit, page } = req.query;
        const result = await pool.query(querys_1.querys.getClients, [page, limit]);
        const clients = result.rows;
        res.json({
            clients: clients
        });
    }
    catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        return res.status(500).json({ error: 'Error al conectar a la base de datos' });
    }
    try {
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
exports.getClients = getClients;
const utilsController = async (req, res) => {
    try {
        const binaryData = Buffer.from(image_1.imageBinary, 'base64');
        const outputImagePath = path_1.default.join(__dirname, '../', 'output.png'); // Ajusta la ruta donde quieres guardar la imagen
        fs_1.default.writeFileSync(outputImagePath, binaryData);
        res.status(200).json({ ok: true }); // Usamos base64 para representar los datos binarios como texto
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
exports.utilsController = utilsController;
//# sourceMappingURL=utils.js.map