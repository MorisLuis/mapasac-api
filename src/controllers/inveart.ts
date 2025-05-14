import type { NextFunction, Request, Response } from "express";
import { postInventoryService, postSellService } from "../services/inveartService";
import { postSellBodySchema, postSellRestaurantBodySchema } from "../validations/sellValidations";

const postInventory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const session = req.session;
        const result = await postInventoryService(session);
        res.status(201).json(result);
    } catch (error) {
        return next(error);
    }
};

const postSell = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {
        const session = req.session;
        const body = postSellBodySchema.parse(req.body);
        const result = await postSellService(session, body, 2);
        res.status(201).json(result);

    } catch (error) {
        return next(error);
    };

};

const postSellRestaurant = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {
        const session = req.session;
        const body = postSellRestaurantBodySchema.parse(req.body);
        const result = await postSellService(session, body, 4);
        res.status(201).json(result);

    } catch (error) {
        return next(error);
    };

};




export {
    postInventory,
    postSell,
    postSellRestaurant
}