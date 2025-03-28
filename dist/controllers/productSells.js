"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIdinveartsProduct = exports.getTotalClassesSells = exports.getTotalProductsSells = exports.getUnits = exports.getProductByEnlacemob = exports.getProductsSellsFromFamily = exports.getProductsSells = void 0;
const productSellsService_1 = require("../services/productSellsService");
const sellValidations_1 = require("../validations/sellValidations");
// Module 2 - Sells
const getProductsSells = async (req, res, next) => {
    try {
        const session = req.session;
        const { limit, page } = sellValidations_1.getProductsSellsQuerySchema.parse(req.query);
        const { products } = await (0, productSellsService_1.getProductsSellsService)(session, page, limit);
        res.json({ products });
    }
    catch (error) {
        return next(error);
    }
    ;
};
exports.getProductsSells = getProductsSells;
const getProductsSellsFromFamily = async (req, res, next) => {
    try {
        // Get session from REDIS.
        const session = req.session;
        const { cvefamilia } = sellValidations_1.getProductsSellsFromFamilyQuerySchema.parse(req.query);
        const { products } = await (0, productSellsService_1.getProductsSellsFromFamilyService)(session, cvefamilia);
        res.json({ products });
    }
    catch (error) {
        return next(error);
    }
};
exports.getProductsSellsFromFamily = getProductsSellsFromFamily;
const getProductByEnlacemob = async (req, res, next) => {
    try {
        const session = req.session;
        const { idinvearts, idinveclas, capa } = sellValidations_1.getProductByEnlacemobQuerySchema.parse(req.query);
        const { products } = await (0, productSellsService_1.getProductByEnlacemobService)(session, idinvearts, idinveclas, capa);
        res.json({ products });
    }
    catch (error) {
        return next(error);
    }
    ;
};
exports.getProductByEnlacemob = getProductByEnlacemob;
const getUnits = async (req, res, next) => {
    try {
        const session = req.session;
        const { units } = await (0, productSellsService_1.getUnitsService)(session);
        res.json({ units });
    }
    catch (error) {
        return next(error);
    }
};
exports.getUnits = getUnits;
const getTotalProductsSells = async (req, res, next) => {
    try {
        const session = req.session;
        const { total } = await (0, productSellsService_1.getTotalProductsSellsService)(session);
        res.json({ total });
    }
    catch (error) {
        return next(error);
    }
};
exports.getTotalProductsSells = getTotalProductsSells;
const getTotalClassesSells = async (req, res, next) => {
    try {
        const session = req.session;
        const { cvefamilia } = sellValidations_1.getProductsSellsFromFamilyQuerySchema.parse(req.query);
        const { total } = await (0, productSellsService_1.getTotalClassesSellsService)(session, cvefamilia);
        res.json({ total });
    }
    catch (error) {
        return next(error);
    }
};
exports.getTotalClassesSells = getTotalClassesSells;
// Pending
const getIdinveartsProduct = async (req, res, next) => {
    try {
        const session = req.session;
        const { cvefamilia } = sellValidations_1.getProductsSellsFromFamilyQuerySchema.parse(req.query);
        const { idinvearts } = await (0, productSellsService_1.getIdinveartsProductService)(session, cvefamilia);
        res.json({ idinvearts });
    }
    catch (error) {
        return next(error);
    }
};
exports.getIdinveartsProduct = getIdinveartsProduct;
//# sourceMappingURL=productSells.js.map