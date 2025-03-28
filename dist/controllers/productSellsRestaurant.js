"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalProductsSellsRestaurant = exports.getProductSellsRestaurantDetails = exports.getProductsSellsRestaurant = void 0;
const productSellsRestaurantService_1 = require("../services/productSellsRestaurantService");
const sellsRestaurant_1 = require("../validations/sellsRestaurant");
// Module 3 - Sells Restaurants
const getProductsSellsRestaurant = async (req, res, next) => {
    try {
        const session = req.session;
        const { limit, page } = sellsRestaurant_1.getProductsSellsRestaurantQuerySchema.parse(req.query);
        const { products } = await (0, productSellsRestaurantService_1.getProductsSellsRestaurantService)(session, page, limit);
        res.json({ products });
    }
    catch (error) {
        return next(error);
    }
    ;
};
exports.getProductsSellsRestaurant = getProductsSellsRestaurant;
const getProductSellsRestaurantDetails = async (req, res, next) => {
    try {
        const session = req.session;
        const { cvefamilia } = sellsRestaurant_1.getProductSellsRestaurantDetailsQuerySchema.parse(req.query);
        const { product } = await (0, productSellsRestaurantService_1.getProductSellsRestaurantDetailsService)(session, cvefamilia);
        res.json({ product });
    }
    catch (error) {
        return next(error);
    }
    ;
};
exports.getProductSellsRestaurantDetails = getProductSellsRestaurantDetails;
const getTotalProductsSellsRestaurant = async (req, res, next) => {
    try {
        const session = req.session;
        const { total } = await (0, productSellsRestaurantService_1.getTotalProductsSellsRestaurantService)(session);
        res.json({ total });
    }
    catch (error) {
        return next(error);
    }
    ;
};
exports.getTotalProductsSellsRestaurant = getTotalProductsSellsRestaurant;
//# sourceMappingURL=productSellsRestaurant.js.map