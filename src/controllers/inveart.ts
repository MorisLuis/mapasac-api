import { Response } from "express";
import { dbConnection } from "../database/connection";
import { Req } from "../helpers/validate-jwt";
import { querys } from "../querys/querys";


const postInventory = async (req: Req, res: Response) => {

    const pool = await dbConnection();
    const client = await pool.connect();
    if (!client) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
        return;
    }

    const idusrmob = req.idusrmob;
    //const folioDate = moment().format('YYYY-MM-DD');
    const folioDate = '2024-07-23';

    const folioQuery = querys.getFolio;
    const folioValue = await pool.query(folioQuery, [folioDate])
    const folio = folioValue.rows[0].fn_pedidos_foliounico;

    try {
        await client.query('BEGIN');

        await client.query(querys.createInventory, [idusrmob, folio]);

        await client.query('COMMIT');

        res.status(201).json({ message: 'Datos insertados exitosamente' });
    } catch (error: any) {
        await client.query('ROLLBACK');
        console.error('Error:', error);
        res.status(500).json({ error: 'Error al insertar los datos', details: error.message });
    } finally {
        client.release();
    }
};

const postSell = async (req: Req, res: Response) => {

    const pool = await dbConnection();
    const client = await pool.connect();
    if (!client) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
        return;
    }

    const idusrmob = req.idusrmob;
    //const folioDate = moment().format('YYYY-MM-DD');
    const folioDate = '2024-07-23';
    const folioQuery = querys.getFolio;
    const folioValue = await pool.query(folioQuery, [folioDate])
    const folio = folioValue.rows[0].fn_pedidos_foliounico;

    try {
        await client.query('BEGIN');

        await client.query(querys.createSale, [idusrmob, folio]);

        await client.query('COMMIT');

        res.status(201).json({ message: 'Datos insertados exitosamente' });
    } catch (error: any) {
        await client.query('ROLLBACK');
        console.error('Error:', error);
        res.status(500).json({ error: 'Error al insertar los datos', details: error.message });
    } finally {
        client.release();
    }
};



export {
    postInventory,
    postSell
}