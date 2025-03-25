import { NextFunction, Request, Response } from "express";
import { getIdinveartsProductService, getProductByEnlacemobService, getProductsSellsFromFamilyService, getProductsSellsService, getTotalClassesSellsService, getTotalProductsSellsService, getUnitsService } from "../services/productSellsService";
import { ProductSellsRestaurantFamilyInterface } from "../interface/productSell";

// Module 2 - Sells
const getProductsSells = async (req: Request, res: Response, next: NextFunction) => {

    try {
        // Get session from REDIS.
        const sessionId = req.sessionId;
        const { limit, page } = req.query;
        const products = await getProductsSellsService(sessionId, page as string, limit as string)
        res.json({ products });

    } catch (error) {
        return next(error);
    };

};

const getProductsSellsFromFamily = async (req: Request, res: Response, next: NextFunction) => {

    //This controller show just the clases and capas.
    try {
        // Get session from REDIS.
        const sessionId = req.sessionId;
        const { cvefamilia } = req.query;
        const products: ProductSellsRestaurantFamilyInterface[] = await getProductsSellsFromFamilyService(sessionId, cvefamilia as string);
        res.json({ products })
    } catch (error) {
        return next(error);
    }
};

const getProductByEnlacemob = async (req: Request, res: Response, next: NextFunction) => {

    try {
        // Get session from REDIS.
        const sessionId = req.sessionId;
        const { idinvearts, idinveclas, capa } = req.query;

        const product = await getProductByEnlacemobService(
            sessionId,
            idinvearts as string,
            idinveclas as string,
            capa as string
        );
        res.json({ product });

    } catch (error) {
        return next(error);
    };

};

const getUnits = async (req: Request, res: Response, next: NextFunction) => {

    try {
        // Get session from REDIS.
        const sessionId = req.sessionId;
        const units = await getUnitsService(sessionId);
        res.json({ units })

    } catch (error) {
        return next(error);
    }
};

const getTotalProductsSells = async (req: Request, res: Response, next: NextFunction) => {

    try {
        // Get session from REDIS.
        const sessionId = req.sessionId;
        const total = await getTotalProductsSellsService(sessionId);
        res.json({ total });
    } catch (error) {
        return next(error);
    }
};

const getTotalClassesSells = async (req: Request, res: Response, next: NextFunction) => {

    try {
        // Get session from REDIS.
        const sessionId = req.sessionId;
        const { cvefamilia } = req.query;
        const total = await getTotalClassesSellsService(sessionId, cvefamilia as string);
        res.json({ total });
    } catch (error) {
        return next(error);
    }
};

const getIdinveartsProduct = async (req: Request, res: Response, next: NextFunction) => {

    try {
        // Get session from REDIS.
        const sessionId = req.sessionId;
        const { cvefamilia } = req.query;
        const product = await getIdinveartsProductService(sessionId, cvefamilia as string);
        res.json({ product });
    } catch (error) {
        return next(error);
    }
};


export {
    // Module 2 - Sells
    getProductsSells,
    getProductsSellsFromFamily,
    getProductByEnlacemob,
    getUnits,
    getTotalProductsSells,
    getTotalClassesSells,
    getIdinveartsProduct
}