"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSell = exports.postInventory = void 0;
const inveartService_1 = require("../services/inveartService");
const postInventory = async (req, res, next) => {
    try {
        const sessionId = req.sessionID;
        const result = await (0, inveartService_1.postInventoryService)(sessionId);
        return res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
        return next(error);
    }
};
exports.postInventory = postInventory;
const postSell = async (req, res, next) => {
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
        res.status(500).json({ error: error.message });
        return next(error);
    }
    ;
};
exports.postSell = postSell;
//# sourceMappingURL=inveart.js.map