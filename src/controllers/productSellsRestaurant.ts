import { NextFunction, Response } from "express";
import { Req } from "../helpers/validate-jwt";
import { getProductSellsRestaurantDetailsService, getProductsSellsRestaurantService, getTotalProductsSellsRestaurantService } from "../services/productSellsRestaurantService";

// Module 3 - Sells Restaurants
const getProductsSellsRestaurant = async (req: Req, res: Response, next: NextFunction) => {

    try {
        // Get session from REDIS.
        const sessionId = req.sessionID;
        const { limit, page } = req.query;
        const products = await getProductsSellsRestaurantService(sessionId, page as string, limit as string);
        res.json({ products });

    } catch (error: any) {
        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        }

        res.status(500).send(error.message);
        return next(error);
    };

};

const getProductSellsRestaurantDetails = async (req: Req, res: Response, next: NextFunction) => {
    try {
        const sessionId = req.sessionID;
        const { cvefamilia } = req.query;

        if (!cvefamilia) {
            return res.status(400).json({ error: 'La clave familia es requerida' });
        }

        // Usar el servicio para obtener los detalles de ventas de productos
        const product = await getProductSellsRestaurantDetailsService(sessionId, cvefamilia as string);

        res.json({
            product
        });
    } catch (error: any) {
        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        }

        res.status(500).send(error.message);
        return next(error);
    };
};

const getTotalProductsSellsRestaurant = async (req: Req, res: Response, next: NextFunction) => {

    try {
        // Get session from REDIS.
        const sessionId = req.sessionID;
        const total = await getTotalProductsSellsRestaurantService(sessionId)
        res.json({
            total
        });
    } catch (error: any) {
        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        }

        res.status(500).send(error.message);
        return next(error);
    };

};

export {
    getProductsSellsRestaurant,
    getProductSellsRestaurantDetails,
    getTotalProductsSellsRestaurant
}