import { NextFunction, Request, Response } from "express";
import { postInventoryService, postSellService } from "../services/inveartService";

const postInventory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sessionId = req.sessionId;
        const result = await postInventoryService(sessionId);
        return res.status(201).json(result);
    } catch (error) {
        return next(error);
    }
};

const postSell = async (req: Request, res: Response, next: NextFunction) => {

    try {
        // Get session from REDIS.
        const sessionId = req.sessionId;
        const { opcion } = req.query
        const body = req.body;
        const result = await postSellService(sessionId, body, opcion as string);
        res.status(201).json(result);
    } catch (error) {
        return next(error);
    };

};



export {
    postInventory,
    postSell
}