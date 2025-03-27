import { NextFunction, Request, Response } from "express";
import { postInventoryService, postSellService } from "../services/inveartService";
import { postSellQuery, postSellBodySchema } from "../validations/sellValidations";

const postInventory = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const session = req.session;
        const result = await postInventoryService(session);
        return res.status(201).json(result);
    } catch (error) {
        return next(error);
    }
};

const postSell = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    try {
        const session = req.session;
        const { opcion } = postSellQuery.parse(req.query)
        const body = postSellBodySchema.parse(req.body);
        const result = await postSellService(session, body, opcion);
        res.status(201).json(result);

    } catch (error) {
        return next(error);
    };

};



export {
    postInventory,
    postSell
}