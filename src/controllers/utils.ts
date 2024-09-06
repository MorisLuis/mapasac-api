import { Request, Response } from "express";
import { dbConnection, getGlobalPool } from "../database/connection";
import fs from 'fs';
import path from 'path';
import { imageBinary } from "../image";
import { querys } from "../querys/querys";
import { Req } from "../helpers/validate-jwt";
import { handleGetSession } from "../utils/Redis/getSession";


const getPaymentType = async (req: Req, res: Response) => {

    // Get session from REDIS.
    const sessionId = req.sessionID;
    const { user: userFR } = await handleGetSession({ sessionId });
    if (!userFR) {
        return res.status(400).json({ error: 'Sesion terminada' });
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await getGlobalPool(connection);

    try {
        const result = await pool.query(querys.getPaymentType);
        const typePayments = result.rows;

        res.json({
            typePayments: typePayments
        })

    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        return res.status(500).json({ error: 'Error al conectar a la base de datos' });
    }

    try {

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }

}

const getClients = async (req: Req, res: Response) => {


    // Get session from REDIS.
    const sessionId = req.sessionID;
    const { user: userFR } = await handleGetSession({ sessionId });
    if (!userFR) {
        return res.status(400).json({ error: 'Sesion terminada' });
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await getGlobalPool(connection);

    try {
        const { limit, page } = req.query;
        const result = await pool.query(querys.getClients, [page, limit]);
        const clients = result.rows;

        res.json({
            clients: clients
        })

    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        return res.status(500).json({ error: 'Error al conectar a la base de datos' });
    }

    try {

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }

}



const utilsController = async (req: Request, res: Response) => {
    try {

        const binaryData = Buffer.from(imageBinary, 'base64');
        const outputImagePath = path.join(__dirname, '../', 'output.png'); // Ajusta la ruta donde quieres guardar la imagen
        fs.writeFileSync(outputImagePath, binaryData);


        res.status(200).json({ ok: true }); // Usamos base64 para representar los datos binarios como texto
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


export {
    getPaymentType,
    getClients,
    utilsController
}