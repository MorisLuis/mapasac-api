import { NextFunction, Request, Response } from "express";
import { getIdinveartsProductService, getProductByEnlacemobService, getProductsSellsFromFamilyService, getProductsSellsService, getTotalClassesSellsService, getTotalProductsSellsService, getUnitsService } from "../services/productSellsService";
import { getProductByEnlacemobQuerySchema, getProductsSellsFromFamilyQuerySchema, getProductsSellsQuerySchema } from "../validations/sellValidations";

// Module 2 - Sells
const getProductsSells = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {
        const session = req.session;
        const { limit, page } = getProductsSellsQuerySchema.parse(req.query);
        const { products } = await getProductsSellsService(session, page, limit)
        res.json({ products });

    } catch (error) {
        return next(error);
    };

};

const getProductsSellsFromFamily = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {
        // Get session from REDIS.
        const session = req.session;
        const { cvefamilia } = getProductsSellsFromFamilyQuerySchema.parse(req.query);
        const { classes } = await getProductsSellsFromFamilyService(session, cvefamilia);
        res.json({ classes })
    } catch (error) {
        return next(error);
    }
};

const getProductByEnlacemob = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {
        const session = req.session;
        const { idinvearts, idinveclas, capa } = getProductByEnlacemobQuerySchema.parse(req.query);
        const { products } = await getProductByEnlacemobService(
            session,
            idinvearts,
            idinveclas,
            capa
        );
        res.json({ products });

    } catch (error) {
        return next(error);
    };

};

const getUnits = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {
        const session = req.session;
        const { units } = await getUnitsService(session);
        res.json({ units })

    } catch (error) {
        return next(error);
    }
};

const getTotalProductsSells = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {
        const session = req.session;
        const { total } = await getTotalProductsSellsService(session);
        res.json({ total });
    } catch (error) {
        return next(error);
    }
};

const getTotalClassesSells = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {
        const session = req.session;
        const { cvefamilia } = getProductsSellsFromFamilyQuerySchema.parse(req.query);
        const { total } = await getTotalClassesSellsService(session, cvefamilia);
        res.json({ total });
    } catch (error) {
        return next(error);
    }
};

// Pending
const getIdinveartsProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {
        const session = req.session;
        const { cvefamilia } = getProductsSellsFromFamilyQuerySchema.parse(req.query);
        const { idinvearts } = await getIdinveartsProductService(session, cvefamilia);
        res.json({ idinvearts });
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