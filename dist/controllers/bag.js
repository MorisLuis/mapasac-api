"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllProductsInBag = exports.deleteProductFromBag = exports.updateProductFromBag = exports.insertPoductToBag = exports.getTotalPriceBag = exports.getTotalProductsInBag = exports.getBag = void 0;
const bagService_1 = require("../services/bagService");
const getBag = async (req, res) => {
    try {
        // Get session from REDIS.
        const sessionId = req.sessionID;
        const { limit, page, option } = req.query;
        const bag = await (0, bagService_1.getBagService)(sessionId, option, page, limit);
        res.json({ bag });
    }
    catch (error) {
        console.log({ error });
        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        }
        ;
        res.status(500).send(error.message);
    }
};
exports.getBag = getBag;
const getTotalProductsInBag = async (req, res) => {
    try {
        // Get session from REDIS.
        const sessionId = req.sessionID;
        const { opcion } = req.query;
        const total = await (0, bagService_1.getTotalProductsInBagService)(sessionId, opcion);
        res.json({ total });
    }
    catch (error) {
        console.log({ error });
        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        }
        ;
        res.status(500).send(error.message);
    }
};
exports.getTotalProductsInBag = getTotalProductsInBag;
const getTotalPriceBag = async (req, res) => {
    try {
        const sessionId = req.sessionID;
        const { opcion } = req.query;
        const total = await (0, bagService_1.getTotalPriceBagService)(sessionId, opcion);
        res.json({ total });
    }
    catch (error) {
        console.log({ error });
        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        }
        ;
        res.status(500).send(error.message);
    }
};
exports.getTotalPriceBag = getTotalPriceBag;
const insertPoductToBag = async (req, res) => {
    try {
        const sessionId = req.sessionID;
        const productData = req.body;
        const result = await (0, bagService_1.insertProductToBagService)(sessionId, productData);
        res.status(201).json(result);
    }
    catch (error) {
        console.error('Error:', error);
        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        }
        ;
        res.status(500).json({ error: error.message });
    }
    ;
};
exports.insertPoductToBag = insertPoductToBag;
const updateProductFromBag = async (req, res) => {
    try {
        const sessionId = req.sessionID;
        const product = req.body;
        await (0, bagService_1.updateProductInBagService)(sessionId, product);
        res.status(201).json({ message: 'Producto actualizado exitosamente' });
    }
    catch (error) {
        console.error('Error:', error);
        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        }
        ;
        res.status(500).send(error.message);
    }
};
exports.updateProductFromBag = updateProductFromBag;
const deleteProductFromBag = async (req, res) => {
    try {
        const sessionId = req.sessionID;
        const { idenlacemob } = req.params;
        await (0, bagService_1.deleteProductFromBagService)(sessionId, idenlacemob);
        res.status(200).json({ message: 'Producto eliminado exitosamente' });
    }
    catch (error) {
        console.error('Error:', error);
        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        }
        ;
        res.status(500).send(error.message);
    }
    ;
};
exports.deleteProductFromBag = deleteProductFromBag;
const deleteAllProductsInBag = async (req, res) => {
    const sessionId = req.sessionID;
    try {
        const { opcion } = req.params;
        await (0, bagService_1.deleteAllProductsInBagService)(sessionId, opcion);
        res.status(200).json({ message: 'Producto eliminado exitosamente' });
    }
    catch (error) {
        console.error('Error:', error);
        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        }
        ;
        res.status(500).send(error.message);
    }
};
exports.deleteAllProductsInBag = deleteAllProductsInBag;
//# sourceMappingURL=bag.js.map