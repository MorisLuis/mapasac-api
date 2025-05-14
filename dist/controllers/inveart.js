"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSellRestaurant = exports.postSell = exports.postInventory = void 0;
const inveartService_1 = require("../services/inveartService");
const sellValidations_1 = require("../validations/sellValidations");
const postInventory = async (req, res, next) => {
    try {
        const session = req.session;
        const result = await (0, inveartService_1.postInventoryService)(session);
        res.status(201).json(result);
    }
    catch (error) {
        return next(error);
    }
};
exports.postInventory = postInventory;
const postSell = async (req, res, next) => {
    try {
        const session = req.session;
        const body = sellValidations_1.postSellBodySchema.parse(req.body);
        const result = await (0, inveartService_1.postSellService)(session, body, 2);
        res.status(201).json(result);
    }
    catch (error) {
        return next(error);
    }
    ;
};
exports.postSell = postSell;
const postSellRestaurant = async (req, res, next) => {
    try {
        const session = req.session;
        const body = sellValidations_1.postSellRestaurantBodySchema.parse(req.body);
        const result = await (0, inveartService_1.postSellService)(session, body, 4);
        res.status(201).json(result);
    }
    catch (error) {
        return next(error);
    }
    ;
};
exports.postSellRestaurant = postSellRestaurant;
//# sourceMappingURL=inveart.js.map