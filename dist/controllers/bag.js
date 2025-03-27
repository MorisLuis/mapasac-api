"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllProductsInBag = exports.deleteProductFromBag = exports.updateProductFromBag = exports.insertPoductToBag = exports.getTotalPriceBag = exports.getTotalProductsInBag = exports.getBag = void 0;
const bagService_1 = require("../services/bagService");
const bagValidations_1 = require("../validations/bagValidations");
const getBag = async (req, res, next) => {
    try {
        const session = req.session;
        const { limit, page, option } = bagValidations_1.getBagQuerySchema.parse(req.query);
        const { bag } = await (0, bagService_1.getBagService)(session, option, page, limit);
        res.status(200).json({ bag });
    }
    catch (error) {
        return next(error);
    }
};
exports.getBag = getBag;
const getTotalProductsInBag = async (req, res, next) => {
    try {
        const session = req.session;
        const { opcion } = bagValidations_1.getTotalProductsInBagQuerySchema.parse(req.query);
        const total = await (0, bagService_1.getTotalProductsInBagService)(session, opcion);
        res.status(200).json({ total });
    }
    catch (error) {
        return next(error);
    }
};
exports.getTotalProductsInBag = getTotalProductsInBag;
const getTotalPriceBag = async (req, res, next) => {
    try {
        const session = req.session;
        const { opcion } = bagValidations_1.getTotalProductsInBagQuerySchema.parse(req.query);
        const total = await (0, bagService_1.getTotalPriceBagService)(session, opcion);
        res.status(200).json({ total });
    }
    catch (error) {
        return next(error);
    }
};
exports.getTotalPriceBag = getTotalPriceBag;
const insertPoductToBag = async (req, res, next) => {
    try {
        const session = req.session;
        const productData = bagValidations_1.insertProductToBagBodySchema.parse(req.body);
        const result = await (0, bagService_1.insertProductToBagService)(session, productData);
        res.status(201).json(result);
    }
    catch (error) {
        return next(error);
    }
    ;
};
exports.insertPoductToBag = insertPoductToBag;
const updateProductFromBag = async (req, res, next) => {
    try {
        const session = req.session;
        const product = req.body;
        await (0, bagService_1.updateProductInBagService)(session, product);
        res.status(200).json({ message: 'Producto actualizado exitosamente' });
    }
    catch (error) {
        return next(error);
    }
};
exports.updateProductFromBag = updateProductFromBag;
const deleteProductFromBag = async (req, res, next) => {
    try {
        const session = req.session;
        const { idenlacemob } = req.params;
        await (0, bagService_1.deleteProductFromBagService)(session, idenlacemob);
        res.status(200).json({ message: 'Producto eliminado exitosamente' });
    }
    catch (error) {
        return next(error);
    }
    ;
};
exports.deleteProductFromBag = deleteProductFromBag;
const deleteAllProductsInBag = async (req, res, next) => {
    try {
        const session = req.session;
        const { opcion } = bagValidations_1.getTotalProductsInBagQuerySchema.parse(req.query);
        await (0, bagService_1.deleteAllProductsInBagService)(session, opcion);
        res.status(200).json({ message: 'Producto eliminado exitosamente' });
    }
    catch (error) {
        return next(error);
    }
};
exports.deleteAllProductsInBag = deleteAllProductsInBag;
//# sourceMappingURL=bag.js.map