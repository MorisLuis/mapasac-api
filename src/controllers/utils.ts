import { Response } from "express";
import { Req } from "../helpers/validate-jwt";
import { getAddressDirectionService, getClientsService, getModulesService, getPaymentTypeService } from "../services/utilsService";

const getPaymentType = async (req: Req, res: Response) => {

    try {
        // Get session from REDIS.
        const sessionId = req.sessionID;
        const typePayments = await getPaymentTypeService(sessionId);
        res.json({ typePayments })

    } catch (error: any) {
        console.error('Error al conectar a la base de datos:', error);

        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        };

        return res.status(500).json({ error: 'Error al conectar a la base de datos' });
    }

};

const getClients = async (req: Req, res: Response) => {

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

        return res.status(500).json({ error: 'Error al conectar a la base de datos' });
    }

};

const getAddressDirection = async (req: Req, res: Response) => {
    try {
        // Get session from REDIS.
        const sessionId = req.sessionID;
        const { idpvtadomi } = req.query;
        const address = await getAddressDirectionService(sessionId, idpvtadomi as string);
        res.json({ address });
    } catch (error: any) {
        console.log({ error });

        if (error.message === 'Sesion terminada') {
            return res.status(401).json({ error: 'Sesion terminada' });
        };

        res.status(500).send(error.message);
    }
};

const getModules = async (req: Req, res: Response) => {
    const idusrmob = req.idusrmob;

    if (!idusrmob) {
        return res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
    }

    try {
        // Delegamos la obtención de los módulos al servicio
        const modules = await getModulesService(idusrmob);
        return res.json({ modules });
    } catch (error: any) {
        console.error({ error });
        return res.status(500).send(error.message);
    }
};


export {
    getPaymentType,
    getClients,
    getAddressDirection,
    getModules
}