import { Response } from "express";
import { Req } from "../helpers/validate-jwt";
import { deleteAllProductsInBagService, deleteProductFromBagService, getBagService, getTotalPriceBagService, getTotalProductsInBagService, insertProductToBagService, updateProductInBagService } from "../services/bagService";

const getBag = async (req: Req, res: Response) => {

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
        console.log({ error })

        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        };

        res.status(500).send(error.message);
    }

};

const getTotalProductsInBag = async (req: Req, res: Response) => {

    try {
        // Get session from REDIS.
        const sessionId = req.sessionID;
        const { opcion } = req.query;
        const total = await getTotalProductsInBagService(sessionId, opcion as string);
        res.json({ total })

    } catch (error: any) {
        console.log({ error });

        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        };

        res.status(500).send(error.message);
    }

};

const getTotalPriceBag = async (req: Req, res: Response) => {

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
    }
}

const insertPoductToBag = async (req: Req, res: Response) => {
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
    };
};

const updateProductFromBag = async (req: Req, res: Response) => {
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
    }
};

const deleteProductFromBag = async (req: Req, res: Response) => {

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
    };

};

const deleteAllProductsInBag = async (req: Req, res: Response) => {
    const sessionId = req.sessionID;

    try {
        const { opcion } = req.params;
        await deleteAllProductsInBagService(sessionId, opcion);
        res.status(200).json({ message: 'Producto eliminado exitosamente' });
    } catch (error: any) {
        console.error('Error:', error);

        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        };

        res.status(500).send(error.message);
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