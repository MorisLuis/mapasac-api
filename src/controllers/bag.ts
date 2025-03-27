import { NextFunction, Request, Response } from "express";
import { deleteAllProductsInBagService, deleteProductFromBagService, getBagService, getTotalPriceBagService, getTotalProductsInBagService, insertProductToBagService, updateProductInBagService } from "../services/bagService";
import { getBagQuerySchema } from "../validations/bagValidations";

const getBag = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    try {
        const session = req.session;
        const { limit, page, option } = getBagQuerySchema.parse(req.query);

        const bag = await getBagService(
            session,
            option,
            page,
            limit
        )

        res.status(200).json({ bag })
    } catch (error) {
        return next(error);
    }

};

const getTotalProductsInBag = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    try {
        // Get session from REDIS.
        const session = req.session;
        const { opcion } = req.query;
        const total = await getTotalProductsInBagService(session, opcion as string);
        return res.status(200).json({ total })

    } catch (error) {
        return next(error);
    }

};

const getTotalPriceBag = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    try {
        const session = req.session;
        const { opcion } = req.query;
        const total = await getTotalPriceBagService(session, opcion as string);
        return res.status(200).json({ total })

    } catch (error) {
        return next(error);
    }
}

const insertPoductToBag = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const session = req.session;
        const productData = req.body;
        const result = await insertProductToBagService(session, productData);
        return res.status(201).json(result);
    } catch (error) {
        return next(error);
    };
};

const updateProductFromBag = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const session = req.session;
        const product = req.body;
        await updateProductInBagService(session, product);
        return res.status(200).json({ message: 'Producto actualizado exitosamente' });
    } catch (error) {
        return next(error);
    }
};

const deleteProductFromBag = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    try {
        const session = req.session;
        const { idenlacemob } = req.params;
        await deleteProductFromBagService(session, idenlacemob);
        return res.status(200).json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
        return next(error);
    };

};

const deleteAllProductsInBag = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const session = req.session;
        const { opcion } = req.query;
        await deleteAllProductsInBagService(session, opcion as string);
        return res.status(200).json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
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