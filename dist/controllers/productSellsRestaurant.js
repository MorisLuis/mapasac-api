"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalProductsSellsRestaurant = exports.getProductSellsRestaurantDetails = exports.getProductsSellsRestaurant = void 0;
const productSellsRestaurantService_1 = require("../services/productSellsRestaurantService");
// Module 3 - Sells Restaurants
const getProductsSellsRestaurant = async (req, res) => {
    try {
        // Get session from REDIS.
        const sessionId = req.sessionID;
        const { limit, page } = req.query;
        const products = await (0, productSellsRestaurantService_1.getProductsSellsRestaurantService)(sessionId, page, limit);
        res.json({ products });
    }
    catch (error) {
        console.log({ error });
        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        }
        res.status(500).send(error.message);
    }
    ;
};
exports.getProductsSellsRestaurant = getProductsSellsRestaurant;
const getProductSellsRestaurantDetails = async (req, res) => {
    try {
        const sessionId = req.sessionID;
        const { cvefamilia } = req.query;
        if (!cvefamilia) {
            return res.status(400).json({ error: 'La clave familia es requerida' });
        }
        // Usar el servicio para obtener los detalles de ventas de productos
        const product = await (0, productSellsRestaurantService_1.getProductSellsRestaurantDetailsService)(sessionId, cvefamilia);
        res.json({
            product
        });
    }
    catch (error) {
        console.error({ error });
        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        }
        res.status(500).send(error.message);
    }
    ;
};
exports.getProductSellsRestaurantDetails = getProductSellsRestaurantDetails;
const getTotalProductsSellsRestaurant = async (req, res) => {
    try {
        // Get session from REDIS.
        const sessionId = req.sessionID;
        const total = await (0, productSellsRestaurantService_1.getTotalProductsSellsRestaurantService)(sessionId);
        res.json({
            total
        });
    }
    catch (error) {
        console.log({ "error-getTotalClassesSells": error });
        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        }
        res.status(500).send(error.message);
    }
    ;
};
exports.getTotalProductsSellsRestaurant = getTotalProductsSellsRestaurant;
//# sourceMappingURL=productSellsRestaurant.js.map