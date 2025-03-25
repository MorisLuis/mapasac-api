"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllProductsInBag = exports.deleteProductFromBag = exports.updateProductFromBag = exports.insertPoductToBag = exports.getTotalPriceBag = exports.getTotalProductsInBag = exports.getBag = void 0;
const bagService_1 = require("../services/bagService");
const getBag = async (req, res, next) => {
    try {
        // Get session from REDIS.
        const sessionId = req.sessionId;
        const { limit, page, option } = req.query;
        const bag = await (0, bagService_1.getBagService)(sessionId, option, page, limit);
        res.json({ bag });
    }
    catch (error) {
        return next(error);
    }
};
exports.getBag = getBag;
const getTotalProductsInBag = async (req, res, next) => {
    try {
        // Get session from REDIS.
        const sessionId = req.sessionId;
        const { opcion } = req.query;
        const total = await (0, bagService_1.getTotalProductsInBagService)(sessionId, opcion);
        return res.json({ total });
    }
    catch (error) {
        return next(error);
    }
};
exports.getTotalProductsInBag = getTotalProductsInBag;
const getTotalPriceBag = async (req, res, next) => {
    try {
        const sessionId = req.sessionId;
        const { opcion } = req.query;
        const total = await (0, bagService_1.getTotalPriceBagService)(sessionId, opcion);
        return res.json({ total });
    }
    catch (error) {
        return next(error);
    }
};
exports.getTotalPriceBag = getTotalPriceBag;
const insertPoductToBag = async (req, res, next) => {
    try {
        const sessionId = req.sessionId;
        const productData = req.body;
        const result = await (0, bagService_1.insertProductToBagService)(sessionId, productData);
        return res.status(201).json(result);
    }
    catch (error) {
        return next(error);
    }
    ;
};
exports.insertPoductToBag = insertPoductToBag;
const updateProductFromBag = async (req, res, next) => {
    try {
        const sessionId = req.sessionId;
        const product = req.body;
        await (0, bagService_1.updateProductInBagService)(sessionId, product);
        return res.status(201).json({ message: 'Producto actualizado exitosamente' });
    }
    catch (error) {
        return next(error);
    }
};
exports.updateProductFromBag = updateProductFromBag;
const deleteProductFromBag = async (req, res, next) => {
    try {
        const sessionId = req.sessionId;
        ;
        const { idenlacemob } = req.params;
        await (0, bagService_1.deleteProductFromBagService)(sessionId, idenlacemob);
        return res.status(200).json({ message: 'Producto eliminado exitosamente' });
    }
    catch (error) {
        console.error('Error:', error);
        return next(error);
    }
    ;
};
exports.deleteProductFromBag = deleteProductFromBag;
const deleteAllProductsInBag = async (req, res, next) => {
    const sessionId = req.sessionId;
    try {
        const { opcion } = req.query;
        await (0, bagService_1.deleteAllProductsInBagService)(sessionId, opcion);
        return res.status(200).json({ message: 'Producto eliminado exitosamente' });
    }
    catch (error) {
        console.error('Error:', error);
        return next(error);
    }
};
exports.deleteAllProductsInBag = deleteAllProductsInBag;
//# sourceMappingURL=bag.js.map