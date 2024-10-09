import { NextFunction, Response } from "express";
import { Req } from "../helpers/validate-jwt";
import { getAddressDirectionService, getClientsService, getModulesService, getPaymentTypeService } from "../services/utilsService";

const getPaymentType = async (req: Req, res: Response, next: NextFunction) => {

    try {
        // Get session from REDIS.
        const sessionId = req.sessionID;
        const typePayments = await getPaymentTypeService(sessionId);
        res.json({ typePayments })

    } catch (error: any) {
        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        };

        res.status(500).json({ error: 'Error al conectar a la base de datos' });
        return next(error);
    }

};

const getClients = async (req: Req, res: Response, next: NextFunction) => {

    try {
        // Get session from REDIS.
        const sessionId = req.sessionID;
        const { limit, page } = req.query;
        const clients = await getClientsService(sessionId, page as string, limit as string)
        res.json({ clients })

    } catch (error: any) {
        console.error('Error al conectar a la base de datos:', error);

        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        };

        res.status(500).json({ error: 'Error al conectar a la base de datos' });
        return next(error);
    }

};

const getAddressDirection = async (req: Req, res: Response, next: NextFunction) => {
    try {
        // Get session from REDIS.
        const sessionId = req.sessionID;
        const { idpvtadomi } = req.query;
        const address = await getAddressDirectionService(sessionId, idpvtadomi as string);
        res.json({ address });
    } catch (error: any) {
        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        };

        res.status(500).send(error.message);
        return next(error);
    }
};

const getModules = async (req: Req, res: Response, next: NextFunction) => {
    const idusrmob = req.idusrmob;

    if (!idusrmob) {
        return res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
    }

    try {
        // Delegamos la obtención de los módulos al servicio
        const modules = await getModulesService(idusrmob);
        return res.json({ modules });
    } catch (error: any) {
        res.status(500).send(error.message);
        return next(error);
    }
};


export {
    getPaymentType,
    getClients,
    getAddressDirection,
    getModules
}