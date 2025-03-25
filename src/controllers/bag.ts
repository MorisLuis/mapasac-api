import { NextFunction, Request, Response } from "express";
import { deleteAllProductsInBagService, deleteProductFromBagService, getBagService, getTotalPriceBagService, getTotalProductsInBagService, insertProductToBagService, updateProductInBagService } from "../services/bagService";

const getBag = async (req: Request, res: Response, next: NextFunction) => {

    try {
        // Get session from REDIS.
        const sessionId = req.sessionId;
        const { limit, page, option } = req.query;

        const bag = await getBagService(
            sessionId,
            option as string,
            page as string,
            limit as string
        )
        res.json({ bag })

    } catch (error) {
        return next(error);
    }

};

const getTotalProductsInBag = async (req: Request, res: Response, next: NextFunction) => {

    try {
        // Get session from REDIS.
        const sessionId = req.sessionId;
        const { opcion } = req.query;
        const total = await getTotalProductsInBagService(sessionId, opcion as string);
        return res.json({ total })

    } catch (error) {
        return next(error);
    }

};

const getTotalPriceBag = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const sessionId = req.sessionId;
        const { opcion } = req.query;
        const total = await getTotalPriceBagService(sessionId, opcion as string);
        return res.json({ total })

    } catch (error) {
        return next(error);
    }
}

const insertPoductToBag = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sessionId = req.sessionId;
        const productData = req.body;
        const result = await insertProductToBagService(sessionId, productData);
        return res.status(201).json(result);
    } catch (error) {
        return next(error);
    };
};

const updateProductFromBag = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sessionId = req.sessionId;
        const product = req.body;
        await updateProductInBagService(sessionId, product);
        return res.status(201).json({ message: 'Producto actualizado exitosamente' });
    } catch (error) {
        return next(error);
    }
};

const deleteProductFromBag = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const sessionId = req.sessionId;
        ;
        const { idenlacemob } = req.params;
        await deleteProductFromBagService(sessionId, idenlacemob);
        return res.status(200).json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
        console.error('Error:', error);

        return next(error);
    };

};

const deleteAllProductsInBag = async (req: Request, res: Response, next: NextFunction) => {
    const sessionId = req.sessionId;
    try {
        const { opcion } = req.query;
        await deleteAllProductsInBagService(sessionId, opcion as string);
        return res.status(200).json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
        console.error('Error:', error);

        return next(error);
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