import { NextFunction, Request, Response } from 'express';
import { searchClientsService, searchProductInBagService, searchProductService } from '../services/searchService';

const searchProduct = async (req: Request, res: Response, next: NextFunction) => {

    try {
        // Get session from REDIS.
        const { term } = req.query;
        const sessionId = req.sessionId;
        const searchTerm = term ? term.toString() : 'a';
        const products = await searchProductService(sessionId, searchTerm);
        res.json({ products })
    } catch (error) {

        return next(error);
    }

};

const searchProductInBag = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get session from REDIS.
        const sessionId = req.sessionId;
        const { term, opcion } = req.query;
        const searchTerm = term ? term.toString() : 'a';
        const products = await searchProductInBagService(sessionId, searchTerm, opcion as string);
        res.json({ products })

    } catch (error) {

        return next(error);
    };
};

const searchClients = async (req: Request, res: Response, next: NextFunction) => {

    try {
        // Get session from REDIS.
        const sessionId = req.sessionId;
        const { term } = req.query;
        const searchTerm = term ? term.toString() : 'a';
        const clients = await searchClientsService(sessionId, searchTerm);
        res.json({ clients })

    } catch (error) {

        return next(error);
    }

};

export {
    searchProduct,
    searchProductInBag,
    searchClients
}