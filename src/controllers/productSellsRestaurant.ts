import { Response } from "express";
import { Req } from "../helpers/validate-jwt";
import { getProductSellsRestaurantDetailsService, getProductsSellsRestaurantService, getTotalProductsSellsRestaurantService } from "../services/productSellsRestaurantService";

// Module 3 - Sells Restaurants
const getProductsSellsRestaurant = async (req: Req, res: Response) => {

    try {
        // Get session from REDIS.
        const sessionId = req.sessionID;
        const { limit, page } = req.query;
        const products = await getProductsSellsRestaurantService(sessionId, page as string, limit as string);
        res.json({ products });

    } catch (error: any) {
        console.log({ error });

        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        }

        res.status(500).send(error.message);
    };

};

const getProductSellsRestaurantDetails = async (req: Req, res: Response) => {
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
        console.error({ error });

        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        }

        res.status(500).send(error.message);
    };
};

const getTotalProductsSellsRestaurant = async (req: Req, res: Response) => {

    try {
        // Get session from REDIS.
        const sessionId = req.sessionID;
        const total = await getTotalProductsSellsRestaurantService(sessionId)
        res.json({
            total
        });
    } catch (error: any) {
        console.log({ "error-getTotalClassesSells": error });

        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        }

        res.status(500).send(error.message);
    };

};

export {
    getProductsSellsRestaurant,
    getProductSellsRestaurantDetails,
    getTotalProductsSellsRestaurant
}