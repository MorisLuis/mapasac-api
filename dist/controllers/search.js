"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchClients = exports.searchProductInBag = exports.searchProduct = void 0;
const searchService_1 = require("../services/searchService");
const searchProduct = async (req, res, next) => {
    try {
        // Get session from REDIS.
        const { term } = req.query;
        const sessionId = req.sessionId;
        const searchTerm = term ? term.toString() : 'a';
        const products = await (0, searchService_1.searchProductService)(sessionId, searchTerm);
        res.json({ products });
    }
    catch (error) {
        return next(error);
    }
};
exports.searchProduct = searchProduct;
const searchProductInBag = async (req, res, next) => {
    try {
        // Get session from REDIS.
        const sessionId = req.sessionId;
        const { term, opcion } = req.query;
        const searchTerm = term ? term.toString() : 'a';
        const products = await (0, searchService_1.searchProductInBagService)(sessionId, searchTerm, opcion);
        res.json({ products });
    }
    catch (error) {
        return next(error);
    }
    ;
};
exports.searchProductInBag = searchProductInBag;
const searchClients = async (req, res, next) => {
    try {
        // Get session from REDIS.
        const sessionId = req.sessionId;
        const { term } = req.query;
        const searchTerm = term ? term.toString() : 'a';
        const clients = await (0, searchService_1.searchClientsService)(sessionId, searchTerm);
        res.json({ clients });
    }
    catch (error) {
        return next(error);
    }
};
exports.searchClients = searchClients;
//# sourceMappingURL=search.js.map