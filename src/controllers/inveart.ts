import { Request, Response } from "express";
import { dbConnection } from "../database/connection";
import { querys } from "../querys";
import { Client } from "pg";


const getInveart = async (req: Request, res: Response) => {

    try {
        const pool = await dbConnection();

        if (!pool) {
            res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
            return;
        }

        const { limit, page } = req.query;

        const result = await pool.query(querys.inveart, [page, limit]);
        const products = result.rows;

        res.json({
            total: products.length,
            products
        })

    } catch (error) {
        console.log({ error })
    }
}


const getInveartByClave = async (req: Request, res: Response) => {

    try {
        const pool = await dbConnection();

        if (!pool) {
            res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
            return;
        }

        const { clave } = req.query;

        const result = await pool.query(querys.getByClave, [clave]);
        const product = result.rows[0];

        res.json({
            product
        })

    } catch (error) {
        console.log({ error })
    }
}

const getInveartById = async (req: Request, res: Response) => {

    try {
        const pool = await dbConnection();

        if (!pool) {
            res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
            return;
        }

        const { idinvearts } = req.query;

        const result = await pool.query(querys.getById, [idinvearts]);
        const product = result.rows[0];

        res.json({
            product
        })

    } catch (error) {
        console.log({ error })
    }
}

const insertInventoryDetails = async (req: Request, res: Response) => {
    try {
        const client: Client | null = await dbConnection();

        if (!client) {
            res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
            return;
        }

        const postInventoryDataArray = req.body;

        // Validación de la estructura de los datos recibidos
        if (!Array.isArray(postInventoryDataArray)) {
            res.status(400).json({ error: 'El cuerpo de la solicitud debe ser un arreglo de objetos' });
            return;
        }

        try {
            await client.query('BEGIN');

            const insertFunctionQuery = `
                SELECT insert_inventario_detalles($1::jsonb)
            `;

            await client.query(insertFunctionQuery, [JSON.stringify(postInventoryDataArray)]);

            await client.query('COMMIT');

            res.status(201).json({ message: 'Datos insertados exitosamente' });

        } catch (error: any) {
            console.log({error})
            await client.query('ROLLBACK');
            res.status(500).json({ error: 'Error al insertar los datos', details: error.message });
        }
    } catch (error: any) {
        res.status(500).json({ error: 'Error en el servidor', details: error.message });
    }
};


export {
    getInveart,
    getInveartByClave,
    getInveartById,
    insertInventoryDetails
}