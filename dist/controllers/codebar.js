"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductCodebar = void 0;
const connection_1 = require("../database/connection");
const querys_1 = require("../querys/querys");
const updateProductCodebar = async (req, res) => {
    try {
        const client = await (0, connection_1.dbConnection)();
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
        const result = await client.query(querys_1.querys.updateCodbar, [codbarras, idinvearts]);
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
};
exports.updateProductCodebar = updateProductCodebar;
//# sourceMappingURL=codebar.js.map