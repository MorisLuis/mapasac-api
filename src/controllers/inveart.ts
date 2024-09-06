import { Response } from "express";
import { dbConnection, getGlobalPool } from "../database/connection";
import { Req } from "../helpers/validate-jwt";
import { querys } from "../querys/querys";
import moment from "moment";
import { bagQuerys } from "../querys/bagQuerys";
import { handleGetSession } from "../utils/Redis/getSession";

const postInventory = async (req: Req, res: Response) => {

    // Get session from REDIS.
    const sessionId = req.sessionID;
    const { user: userFR } = await handleGetSession({ sessionId });
    if (!userFR) {
        return res.status(400).json({ error: 'Sesion terminada' });
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await getGlobalPool(connection);
    const client = await pool.connect();
    if (!client) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
        return;
    }

    try {
        const folioDate = moment().format('YYYY-MM-DD');
        const folioQuery = querys.getFolio;
        const folioValue = await pool.query(folioQuery, [folioDate])
        const folio = folioValue.rows[0].fn_pedidos_foliounico;


        await client.query('BEGIN');

        await client.query(querys.createInventory, [idusrmob, folio]);

        await client.query('COMMIT');

        res.status(201).json({ message: 'Datos insertados exitosamente' });
    } catch (error: any) {
        console.log('Error:', error);
        res.status(500).send(error.message);
        await client.query('ROLLBACK');
    } finally {
        client.release();
    }
};

const postSell = async (req: Req, res: Response) => {

    const { clavepago, idclientes, comments } = req.body;

    // Get session from REDIS.
    const sessionId = req.sessionID;
    const { user: userFR } = await handleGetSession({ sessionId });
    if (!userFR) {
        return res.status(400).json({ error: 'Sesion terminada' });
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await getGlobalPool(connection);


    const client = await pool.connect();
    if (!client) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
        return;
    }

    try {
        const folioDate = moment().format('YYYY-MM-DD');
        const folioQuery = querys.getFolio;
        const folioValue = await pool.query(folioQuery, [folioDate])
        const folio = folioValue.rows[0].fn_pedidos_foliounico;

        await client.query('BEGIN');
        await client.query(bagQuerys.updateProductCommentsFromBag, [comments || "", idclientes || 0, clavepago, idusrmob]);
        await client.query(querys.createSale, [idusrmob, folio]);
        await client.query('COMMIT');

        res.status(201).json({ message: 'Datos insertados exitosamente' });
    } catch (error: any) {
        await client.query('ROLLBACK');
        console.log('Error:', error);
        res.status(500).send(error.message);
    } finally {
        client.release();
    }
};



export {
    postInventory,
    postSell
}