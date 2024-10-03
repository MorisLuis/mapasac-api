import { Response } from "express";
import { Req } from "../helpers/validate-jwt";
import { postInventoryService, postSellService } from "../services/inveartService";

const postInventory = async (req: Req, res: Response) => {
    try {
        const sessionId = req.sessionID;
        const result = await postInventoryService(sessionId);
        return res.status(201).json(result);
    } catch (error: any) {
        console.error('Error:', error);
        return res.status(500).json({ error: error.message });
    }
};

const postSell = async (req: Req, res: Response) => {

    try {
        // Get session from REDIS.
        const sessionId = req.sessionID;
        const { opcion } = req.query
        const body = req.body;
        await postSellService(sessionId, body, opcion as string);
        res.status(201).json({ message: 'Datos insertados exitosamente' });
    } catch (error: any) {
        console.error('Error:', error);
        return res.status(500).json({ error: error.message });
    };

};



export {
    postInventory,
    postSell
}