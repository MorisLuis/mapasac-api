import { NextFunction, Response } from "express";
import { Req } from "../helpers/validate-jwt";
import ProductSellsFamilyInterface from "../interface/productSell";
import { getIdinveartsProductService, getProductByEnlacemobService, getProductsSellsFromFamilyService, getProductsSellsService, getTotalClassesSellsService, getTotalProductsSellsService, getUnitsService } from "../services/productSellsService";

// Module 2 - Sells
const getProductsSells = async (req: Req, res: Response, next: NextFunction) => {

    try {
        // Get session from REDIS.
        const sessionId = req.sessionID;
        const { limit, page } = req.query;
        const products = await getProductsSellsService(sessionId, page as string, limit as string)
        res.json({ products });

    } catch (error: any) {

        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        };

        res.status(500).send(error.message);
        return next(error);
    };

};

const getProductsSellsFromFamily = async (req: Req, res: Response, next: NextFunction) => {

    //This controller show just the clases and capas.
    try {
        // Get session from REDIS.
        const sessionId = req.sessionID;
        const { cvefamilia } = req.query;
        const products: ProductSellsFamilyInterface[] = await getProductsSellsFromFamilyService(sessionId, cvefamilia as string);
        res.json({ products })
    } catch (error: any) {
        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        };

        res.status(500).send(error.message);
        return next(error);
    }
};

const getProductByEnlacemob = async (req: Req, res: Response, next: NextFunction) => {

    try {
        // Get session from REDIS.
        const sessionId = req.sessionID;
        const { idinvearts, idinveclas, capa } = req.query;

        const product = await getProductByEnlacemobService(
            sessionId,
            idinvearts as string,
            idinveclas as string,
            capa as string
        );
        res.json({ product });

    } catch (error: any) {
        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        };

        res.status(500).send(error.message);
        return next(error);
    };

};

const getUnits = async (req: Req, res: Response, next: NextFunction) => {

    try {
        // Get session from REDIS.
        const sessionId = req.sessionID;
        const units = await getUnitsService(sessionId);
        res.json({ units })

    } catch (error: any) {
        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        };

        res.status(500).send(error.message);
        return next(error);
    }
};

const getTotalProductsSells = async (req: Req, res: Response, next: NextFunction) => {

    try {
        // Get session from REDIS.
        const sessionId = req.sessionID;
        const total = await getTotalProductsSellsService(sessionId);
        res.json({ total });
    } catch (error: any) {
        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        };

        res.status(500).send(error.message);
        return next(error);
    }
};

const getTotalClassesSells = async (req: Req, res: Response, next: NextFunction) => {

    try {
        // Get session from REDIS.
        const sessionId = req.sessionID;
        const { cvefamilia } = req.query;
        const total = await getTotalClassesSellsService(sessionId, cvefamilia as string);
        res.json({ total });
    } catch (error: any) {
        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        };

        res.status(500).send(error.message);
        return next(error);
    }
};

const getIdinveartsProduct = async (req: Req, res: Response, next: NextFunction) => {

    try {
        // Get session from REDIS.
        const sessionId = req.sessionID;
        const { cvefamilia } = req.query;
        const product = await getIdinveartsProductService(sessionId, cvefamilia as string);
        res.json({ product });
    } catch (error: any) {

        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        };

        res.status(500).send(error.message);
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