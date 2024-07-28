import { Response } from "express";
import { dbConnection } from "../database/connection";
import { bagQuerys } from "../querys/bagQuerys";
import { Req } from "../helpers/validate-jwt";

const getBag = async (req: Req, res: Response) => {

    const idusrmob = req.idusrmob;
    if(!idusrmob) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
        return;
    };

    const pool = await dbConnection({idusrmob});
    const client = await pool.connect();
    if (!client) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
        return;
    }

    try {

        const { limit, page, option } = req.query;
        const result = await pool.query(bagQuerys.getBag, [option, idusrmob, page, limit]);
        const products = result.rows;

        res.json({
            bag: products
        })

    } catch (error: any) {
        console.log({ error })
        res.status(500).send(error.message);
    }

}

const inserPoductToBag = async (req: Req, res: Response) => {

    const idusrmob = req.idusrmob;
    if(!idusrmob) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
        return;
    };

    const pool = await dbConnection({idusrmob});
    const client = await pool.connect();
    if (!client) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
        return;
    }

    try {

        const { idinvearts, codbarras, unidad, cantidad, precio1: precio, opcion } = req.body;
        const productBody = [idinvearts, codbarras, unidad, cantidad, precio, idusrmob, opcion]
    
        await client.query('BEGIN');

        await client.query(bagQuerys.addProductToBag, productBody);

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

const updatePoductFromBag = async (req: Req, res: Response) => {


    const idusrmob = req.idusrmob;
    if(!idusrmob) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
        return;
    };

    const pool = await dbConnection({idusrmob});

    const client = await pool.connect();
    if (!client) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
        return;
    }

    
    try {
        const { idenlacemob, cantidad } = req.body;
        await client.query('BEGIN');

        await client.query(bagQuerys.updateProductFromBag, [cantidad, idenlacemob]);

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

const deletePoductFromBag = async (req: Req, res: Response) => {

    const idusrmob = req.idusrmob;
    if(!idusrmob) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
        return;
    };

    const pool = await dbConnection({idusrmob});
    const client = await pool.connect();
    if (!client) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
        return;
    }

    try {
        const { idenlacemob } = req.params;
        await client.query('BEGIN');

        await client.query(bagQuerys.deleteProductFromBag, [idenlacemob]);

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

const getTotalProductsInBag = async (req: Req, res: Response) => {

    const idusrmob = req.idusrmob;
    if(!idusrmob) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
        return;
    };

    const pool = await dbConnection({idusrmob});
    const client = await pool.connect();
    if (!client) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
        return;
    }

    try {
        const { opcion } = req.query;
        const result = await pool.query(bagQuerys.getTotalProductsInBag, [opcion]);
        const totalproducts = result.rows[0].count;

        res.json({
            total: totalproducts
        })

    } catch (error: any) {
        console.log({ error })
        res.status(500).send(error.message);
    }

}

const deleteAllProductsInBag = async (req: Req, res: Response) => {

    const idusrmob = req.idusrmob;
    if(!idusrmob) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
        return;
    };

    const pool = await dbConnection({idusrmob});
    const client = await pool.connect();
    if (!client) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
        return;
    }

    try {
        const { opcion } = req.query;
        await client.query('BEGIN');

        await client.query(bagQuerys.deleteAllProductsInBag, [idusrmob, Number(opcion)]);

        await client.query('COMMIT');

        res.status(201).json({ message: 'Datos eliminados exitosamente' });
    } catch (error: any) {
        await client.query('ROLLBACK');
        console.error('Error:', error);
        res.status(500).json({ error: 'Error al insertar los datos', details: error.message });
    } finally {
        client.release();
    }

}


export {
    getBag,
    inserPoductToBag,
    updatePoductFromBag,
    deletePoductFromBag,
    getTotalProductsInBag,
    deleteAllProductsInBag
}