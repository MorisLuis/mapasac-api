import { NextFunction, Request, Response } from 'express';
import { searchClientsService, searchProductInBagService, searchProductService } from '../services/searchService';

const searchProduct = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    try {
        const { term } = req.query;
        const session = req.session;
        const searchTerm = term ? term.toString() : 'a';
        const products = await searchProductService(session, searchTerm);
        res.json({ products })
    } catch (error) {

        return next(error);
    }

};

const searchProductInBag = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const session = req.session;
        const { term, opcion } = req.query;
        const searchTerm = term ? term.toString() : 'a';
        const products = await searchProductInBagService(session, searchTerm, opcion as string);
        res.json({ products })

    } catch (error) {
        return next(error);
    };
};

const searchClients = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    try {
        const session = req.session;
        const { term } = req.query;
        const searchTerm = term ? term.toString() : 'a';
        const clients = await searchClientsService(session, searchTerm);
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