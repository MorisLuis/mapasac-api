import { NextFunction, Request, Response } from "express";
import { getProductSellsRestaurantDetailsService, getProductsSellsRestaurantService, getTotalProductsSellsRestaurantService } from "../services/productSellsRestaurantService";

// Module 3 - Sells Restaurants
const getProductsSellsRestaurant = async (req: Request, res: Response, next: NextFunction) => {

    try {
        // Get session from REDIS.
        const sessionId = req.sessionId;
        const { limit, page } = req.query;
        const products = await getProductsSellsRestaurantService(sessionId, page as string, limit as string);
        res.json({ products });

    } catch (error) {
        return next(error);
    };

};

const getProductSellsRestaurantDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sessionId = req.sessionId;
        const { cvefamilia } = req.query;

        if (!cvefamilia) {
            return res.status(400).json({ error: 'La clave familia es requerida' });
        }

        // Usar el servicio para obtener los detalles de ventas de productos
        const product = await getProductSellsRestaurantDetailsService(sessionId, cvefamilia as string);

        res.json({
            product
        });
    } catch (error) {
        return next(error);
    };
};

const getTotalProductsSellsRestaurant = async (req: Request, res: Response, next: NextFunction) => {

    try {
        // Get session from REDIS.
        const sessionId = req.sessionId;
        const total = await getTotalProductsSellsRestaurantService(sessionId)
        res.json({
            total
        });
    } catch (error) {
        return next(error);
    };

};

export {
    getProductsSellsRestaurant,
    getProductSellsRestaurantDetails,
    getTotalProductsSellsRestaurant
}