import { NextFunction, Request, Response } from "express";
import { getProductSellsRestaurantDetailsService, getProductsSellsRestaurantService, getTotalProductsSellsRestaurantService } from "../services/productSellsRestaurantService";
import { getProductSellsRestaurantDetailsQuerySchema, getProductsSellsRestaurantQuerySchema } from "../validations/sellsRestaurant";

// Module 3 - Sells Restaurants
const getProductsSellsRestaurant = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {
        const session = req.session;
        const { limit, page } = getProductsSellsRestaurantQuerySchema.parse(req.query);
        const {products} = await getProductsSellsRestaurantService(session, page, limit);
        res.json({ products });

    } catch (error) {
        return next(error);
    };

};

const getProductSellsRestaurantDetails = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const session = req.session;
        const { cvefamilia } = getProductSellsRestaurantDetailsQuerySchema.parse(req.query);
        const {product} = await getProductSellsRestaurantDetailsService(session, cvefamilia);
        res.json({ product });
    } catch (error) {
        return next(error);
    };
};

const getTotalProductsSellsRestaurant = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {
        const session = req.session;
        const {total} = await getTotalProductsSellsRestaurantService(session)
        res.json({ total });
    } catch (error) {
        return next(error);
    };

};

export {
    getProductsSellsRestaurant,
    getProductSellsRestaurantDetails,
    getTotalProductsSellsRestaurant
}