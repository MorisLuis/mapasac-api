"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSell = exports.postInventory = void 0;
const inveartService_1 = require("../services/inveartService");
const sellValidations_1 = require("../validations/sellValidations");
const postInventory = async (req, res, next) => {
    try {
        const session = req.session;
        const result = await (0, inveartService_1.postInventoryService)(session);
        return res.status(201).json(result);
    }
    catch (error) {
        return next(error);
    }
};
exports.postInventory = postInventory;
const postSell = async (req, res, next) => {
    try {
        const session = req.session;
        const { opcion } = sellValidations_1.postSellQuery.parse(req.query);
        const body = sellValidations_1.postSellBodySchema.parse(req.body);
        const result = await (0, inveartService_1.postSellService)(session, body, opcion);
        res.status(201).json(result);
    }
    catch (error) {
        return next(error);
    }
    ;
};
exports.postSell = postSell;
//# sourceMappingURL=inveart.js.map