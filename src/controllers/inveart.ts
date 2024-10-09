import { NextFunction, Response } from "express";
import { Req } from "../helpers/validate-jwt";
import { postInventoryService, postSellService } from "../services/inveartService";

const postInventory = async (req: Req, res: Response, next: NextFunction) => {
    try {
        const sessionId = req.sessionID;
        const result = await postInventoryService(sessionId);
        return res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
        return next(error);
    }
};

const postSell = async (req: Req, res: Response, next: NextFunction) => {

    try {
        // Get session from REDIS.
        const sessionId = req.sessionID;
        const { opcion } = req.query
        const body = req.body;
        console.log({ body })
        await postSellService(sessionId, body, opcion as string);
        res.status(201).json({ message: 'Datos insertados exitosamente' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
        return next(error);
    };

};



export {
    postInventory,
    postSell
}