"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSell = exports.postInventory = void 0;
const inveartService_1 = require("../services/inveartService");
const postInventory = async (req, res, next) => {
    try {
        const sessionId = req.sessionId;
        const result = await (0, inveartService_1.postInventoryService)(sessionId);
        return res.status(201).json(result);
    }
    catch (error) {
        return next(error);
    }
};
exports.postInventory = postInventory;
const postSell = async (req, res, next) => {
    try {
        // Get session from REDIS.
        const sessionId = req.sessionId;
        const { opcion } = req.query;
        const body = req.body;
        const result = await (0, inveartService_1.postSellService)(sessionId, body, opcion);
        res.status(201).json(result);
    }
    catch (error) {
        return next(error);
    }
    ;
};
exports.postSell = postSell;
//# sourceMappingURL=inveart.js.map