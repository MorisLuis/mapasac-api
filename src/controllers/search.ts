import type { NextFunction, Request, Response } from 'express';
import { searchClientsService, searchProductInBagService, searchProductService } from '../services/searchService';
import { searchProductInBagQuerySchema, searchProductsQuerySchema } from '../validations/searchValidations';

const searchProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {
        const { term, codebarEmpty } = searchProductsQuerySchema.parse(req.query);
        console.log({codebarEmpty})
        const session = req.session;
        const searchTerm = term ? term.toString() : 'a';
        const { products } = await searchProductService(session, searchTerm, codebarEmpty);
        res.json({ products })
    } catch (error) {
        return next(error);
    }

};

const searchProductInBag = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const session = req.session;
        const { term, opcion } = searchProductInBagQuerySchema.parse(req.query);
        const searchTerm = term ? term.toString() : 'a';
        const { products } = await searchProductInBagService(session, searchTerm, opcion);
        res.json({ products })

    } catch (error) {
        return next(error);
    };
};

const searchClients = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {
        const session = req.session;
        const { term } = req.query;
        const searchTerm = term ? term.toString() : 'a';
        const { clients } = await searchClientsService(session, searchTerm);
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