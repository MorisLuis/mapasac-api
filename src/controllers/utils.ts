import { NextFunction, Request, Response } from "express";
import { getAddressDirectionService, getClientsService, getModulesService, getPaymentTypeService } from "../services/utilsService";

const getPaymentType = async (req: Request, res: Response, next: NextFunction) => {

    try {
        // Get session from REDIS.
        const sessionId = req.sessionId;
        const typePayments = await getPaymentTypeService(sessionId);
        res.json({ typePayments })

    } catch (error) {
        return next(error);
    }

};

const getClients = async (req: Request, res: Response, next: NextFunction) => {

    try {
        // Get session from REDIS.
        const sessionId = req.sessionId;
        const { limit, page } = req.query;
        const clients = await getClientsService(sessionId, page as string, limit as string)
        res.json({ clients })

    } catch (error) {
        return next(error);
    }

};

const getAddressDirection = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get session from REDIS.
        const sessionId = req.sessionId;
        const { idpvtadomi } = req.query;
        const address = await getAddressDirectionService(sessionId, idpvtadomi as string);
        res.json({ address });
    } catch (error) {
        return next(error);
    }
};

const getModules = async (req: Request, res: Response, next: NextFunction) => {
    const idusrmob = req.idusrmob;

    if (!idusrmob) {
        return res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
    }

    try {
        // Delegamos la obtención de los módulos al servicio
        const modules = await getModulesService(idusrmob);
        return res.json({ modules });
    } catch (error) {
        return next(error);
    }
};


export {
    getPaymentType,
    getClients,
    getAddressDirection,
    getModules
}