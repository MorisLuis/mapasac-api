"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIdinveartsProduct = exports.getTotalClassesSells = exports.getTotalProductsSells = exports.getUnits = exports.getProductByEnlacemob = exports.getProductsSellsFromFamily = exports.getProductsSells = void 0;
const productSellsService_1 = require("../services/productSellsService");
// Module 2 - Sells
const getProductsSells = async (req, res, next) => {
    try {
        // Get session from REDIS.
        const sessionId = req.sessionID;
        const { limit, page } = req.query;
        const products = await (0, productSellsService_1.getProductsSellsService)(sessionId, page, limit);
        res.json({ products });
    }
    catch (error) {
        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        }
        ;
        res.status(500).send(error.message);
        return next(error);
    }
    ;
};
exports.getProductsSells = getProductsSells;
const getProductsSellsFromFamily = async (req, res, next) => {
    //This controller show just the clases and capas.
    try {
        // Get session from REDIS.
        const sessionId = req.sessionID;
        const { cvefamilia } = req.query;
        const products = await (0, productSellsService_1.getProductsSellsFromFamilyService)(sessionId, cvefamilia);
        res.json({ products });
    }
    catch (error) {
        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        }
        ;
        res.status(500).send(error.message);
        return next(error);
    }
};
exports.getProductsSellsFromFamily = getProductsSellsFromFamily;
const getProductByEnlacemob = async (req, res, next) => {
    try {
        // Get session from REDIS.
        const sessionId = req.sessionID;
        const { idinvearts, idinveclas, capa } = req.query;
        const product = await (0, productSellsService_1.getProductByEnlacemobService)(sessionId, idinvearts, idinveclas, capa);
        res.json({ product });
    }
    catch (error) {
        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        }
        ;
        res.status(500).send(error.message);
        return next(error);
    }
    ;
};
exports.getProductByEnlacemob = getProductByEnlacemob;
const getUnits = async (req, res, next) => {
    try {
        // Get session from REDIS.
        const sessionId = req.sessionID;
        const units = await (0, productSellsService_1.getUnitsService)(sessionId);
        res.json({ units });
    }
    catch (error) {
        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        }
        ;
        res.status(500).send(error.message);
        return next(error);
    }
};
exports.getUnits = getUnits;
const getTotalProductsSells = async (req, res, next) => {
    try {
        // Get session from REDIS.
        const sessionId = req.sessionID;
        const total = await (0, productSellsService_1.getTotalProductsSellsService)(sessionId);
        res.json({ total });
    }
    catch (error) {
        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        }
        ;
        res.status(500).send(error.message);
        return next(error);
    }
};
exports.getTotalProductsSells = getTotalProductsSells;
const getTotalClassesSells = async (req, res, next) => {
    try {
        // Get session from REDIS.
        const sessionId = req.sessionID;
        const { cvefamilia } = req.query;
        const total = await (0, productSellsService_1.getTotalClassesSellsService)(sessionId, cvefamilia);
        res.json({ total });
    }
    catch (error) {
        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        }
        ;
        res.status(500).send(error.message);
        return next(error);
    }
};
exports.getTotalClassesSells = getTotalClassesSells;
const getIdinveartsProduct = async (req, res, next) => {
    try {
        // Get session from REDIS.
        const sessionId = req.sessionID;
        const { cvefamilia } = req.query;
        const product = await (0, productSellsService_1.getIdinveartsProductService)(sessionId, cvefamilia);
        res.json({ product });
    }
    catch (error) {
        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        }
        ;
        res.status(500).send(error.message);
        return next(error);
    }
};
exports.getIdinveartsProduct = getIdinveartsProduct;
//# sourceMappingURL=productSells.js.map