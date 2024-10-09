import { NextFunction, Response } from "express";
import { Req } from "../helpers/validate-jwt";
import { deleteAllProductsInBagService, deleteProductFromBagService, getBagService, getTotalPriceBagService, getTotalProductsInBagService, insertProductToBagService, updateProductInBagService } from "../services/bagService";
import { handleErrorsBackend } from "./errors";

const getBag = async (req: Req, res: Response, next: NextFunction) => {

    try {
        // Get session from REDIS.
        const sessionId = req.sessionID;
        const { limit, page, option } = req.query;

        const bag = await getBagService(
            sessionId,
            option as string,
            page as string,
            limit as string
        )
        res.json({ bag })

    } catch (error: any) {

        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        };

        res.status(500).send(error.message);
        return next(error);
    }

};

const getTotalProductsInBag = async (req: Req, res: Response, next: NextFunction) => {

    try {
        // Get session from REDIS.
        const sessionId = req.sessionID;
        const { opcion } = req.query;
        const total = await getTotalProductsInBagService(sessionId, opcion as string);
        res.json({ total })

    } catch (error: any) {
        handleErrorsBackend(error)

        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        };

        res.status(500).send(error.message);
        next(error);
    }

};

const getTotalPriceBag = async (req: Req, res: Response, next: NextFunction) => {

    try {
        const sessionId = req.sessionID;
        const { opcion } = req.query;
        const total = await getTotalPriceBagService(sessionId, opcion as string);
        res.json({ total })

    } catch (error: any) {
        console.log({ error });

        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        };

        res.status(500).send(error.message);
        next(error);
    }
}

const insertPoductToBag = async (req: Req, res: Response, next: NextFunction) => {
    try {
        const sessionId = req.sessionID;
        const productData = req.body;
        const result = await insertProductToBagService(sessionId, productData);
        res.status(201).json(result);
    } catch (error: any) {
        console.error('Error:', error);

        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        };

        res.status(500).json({ error: error.message });
        next(error);
    };
};

const updateProductFromBag = async (req: Req, res: Response, next: NextFunction) => {
    try {
        const sessionId = req.sessionID;
        const product = req.body;
        await updateProductInBagService(sessionId, product);
        res.status(201).json({ message: 'Producto actualizado exitosamente' });
    } catch (error: any) {
        console.error('Error:', error);

        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        };

        res.status(500).send(error.message);
        next(error);
    }
};

const deleteProductFromBag = async (req: Req, res: Response, next: NextFunction) => {

    try {
        const sessionId = req.sessionID;
        const { idenlacemob } = req.params;
        await deleteProductFromBagService(sessionId, idenlacemob);
        res.status(200).json({ message: 'Producto eliminado exitosamente' });
    } catch (error: any) {
        console.error('Error:', error);

        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        };

        res.status(500).send(error.message);
        next(error);
    };

};

const deleteAllProductsInBag = async (req: Req, res: Response, next: NextFunction) => {
    const sessionId = req.sessionID;

    try {
        const { opcion } = req.query;
        await deleteAllProductsInBagService(sessionId, opcion as string);
        res.status(200).json({ message: 'Producto eliminado exitosamente' });
    } catch (error: any) {
        console.error('Error:', error);

        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        };

        res.status(500).send(error.message);
        next(error);
    }
};

export {
    getBag,
    getTotalProductsInBag,
    getTotalPriceBag,
    insertPoductToBag,
    updateProductFromBag,
    deleteProductFromBag,
    deleteAllProductsInBag
}