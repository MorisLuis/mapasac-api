import { NextFunction, Response } from 'express';
import { Req } from '../helpers/validate-jwt';
import { searchClientsService, searchProductInBagService, searchProductService } from '../services/searchService';

const searchProduct = async (req: Req, res: Response, next: NextFunction) => {

    try {
        // Get session from REDIS.
        const { term } = req.query;
        const sessionId = req.sessionID;
        const searchTerm = term ? term.toString() : 'a';
        const products = await searchProductService(sessionId, searchTerm);
        res.json({ products })
    } catch (error: any) {
        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        };
        res.status(500).json({ error: error.message || 'Unexpected error' });
        return next(error);
    }

};

const searchProductInBag = async (req: Req, res: Response, next: NextFunction) => {
    try {
        // Get session from REDIS.
        const sessionId = req.sessionID;
        const { term, opcion } = req.query;
        const searchTerm = term ? term.toString() : 'a';
        const products = await searchProductInBagService(sessionId, searchTerm, opcion as string);
        res.json({ products })

    } catch (error: any) {
        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        };

        res.status(500).send(error.message);
        return next(error);
    };
};

const searchClients = async (req: Req, res: Response, next: NextFunction) => {

    try {
        // Get session from REDIS.
        const sessionId = req.sessionID;
        const { term } = req.query;
        const searchTerm = term ? term.toString() : 'a';
        const clients = await searchClientsService(sessionId, searchTerm);
        res.json({ clients })

    } catch (error: any) {
        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        };

        res.status(500).json({ error: error.message || 'Unexpected error' });
        return next(error);
    }

};

export {
    searchProduct,
    searchProductInBag,
    searchClients
}