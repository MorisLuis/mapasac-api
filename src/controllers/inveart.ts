import { Response } from "express";
import { dbConnection } from "../database/connection";
import { Req } from "../helpers/validate-jwt";
import { querys } from "../querys/querys";
import moment from "moment";
import { bagQuerys } from "../querys/bagQuerys";

const postInventory = async (req: Req, res: Response) => {

    const idusrmob = req.idusrmob;
    if (!idusrmob) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
        return;
    };

    const pool = await dbConnection({ idusrmob });
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

    const idusrmob = req.idusrmob;
    const { mercado } = req.query;
    const { clavepago, idclientes, comments } = req.body;

    if (!idusrmob) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
        return;
    };

    let pool;
    if (mercado === 'true') {
        pool = await dbConnection({ idusrmob, database: "mercado" });
    } else {
        pool = await dbConnection({ idusrmob });
    };


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