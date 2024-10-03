"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchClients = exports.searchProductInBag = exports.searchProduct = void 0;
const searchService_1 = require("../services/searchService");
const searchProduct = async (req, res) => {
    try {
        // Get session from REDIS.
        const { term } = req.query;
        const sessionId = req.sessionID;
        const searchTerm = term ? term.toString() : 'a';
        const products = await (0, searchService_1.searchProductService)(sessionId, searchTerm);
        res.json({ products });
    }
    catch (error) {
        console.log({ error });
        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        }
        ;
        return res.status(500).json({ error: error.message || 'Unexpected error' });
    }
};
exports.searchProduct = searchProduct;
const searchProductInBag = async (req, res) => {
    try {
        // Get session from REDIS.
        const sessionId = req.sessionID;
        const { term, opcion } = req.query;
        const searchTerm = term ? term.toString() : 'a';
        const products = await (0, searchService_1.searchProductInBagService)(sessionId, searchTerm, opcion);
        res.json({ products });
    }
    catch (error) {
        console.log({ error });
        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        }
        ;
        res.status(500).send(error.message);
    }
    ;
};
exports.searchProductInBag = searchProductInBag;
const searchClients = async (req, res) => {
    try {
        // Get session from REDIS.
        const sessionId = req.sessionID;
        const { term } = req.query;
        const searchTerm = term ? term.toString() : 'a';
        const clients = await (0, searchService_1.searchClientsService)(sessionId, searchTerm);
        res.json({ clients });
    }
    catch (error) {
        console.log({ error });
        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        }
        ;
        return res.status(500).json({ error: error.message || 'Unexpected error' });
    }
};
exports.searchClients = searchClients;
//# sourceMappingURL=search.js.map