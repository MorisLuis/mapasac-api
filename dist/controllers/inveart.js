"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSell = exports.postInventory = void 0;
const inveartService_1 = require("../services/inveartService");
const postInventory = async (req, res) => {
    try {
        const sessionId = req.sessionID;
        const result = await (0, inveartService_1.postInventoryService)(sessionId);
        return res.status(201).json(result);
    }
    catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: error.message });
    }
};
exports.postInventory = postInventory;
const postSell = async (req, res) => {
    try {
        // Get session from REDIS.
        const sessionId = req.sessionID;
        const { opcion } = req.query;
        const body = req.body;
        console.log({ body });
        await (0, inveartService_1.postSellService)(sessionId, body, opcion);
        res.status(201).json({ message: 'Datos insertados exitosamente' });
    }
    catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: error.message });
    }
    ;
};
exports.postSell = postSell;
//# sourceMappingURL=inveart.js.map