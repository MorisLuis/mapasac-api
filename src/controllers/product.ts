import { Response } from "express";
import { dbConnection } from "../database/connection";
import { productQuerys } from "../querys/productQuery";
import { verifyIfIsEAN13 } from "../utils/identifyBarcodeType";
import { Req } from "../helpers/validate-jwt";


const getProducts = async (req: Req, res: Response) => {

    const idusrmob = req.idusrmob;
    if (!idusrmob) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
        return;
    };

    const pool = await dbConnection(idusrmob);

    try {
        const { limit, page } = req.query;

        const result = await pool.query(productQuerys.getProducts, [page, limit]);
        const products = result.rows;

        res.json({
            total: products.length,
            products
        })

    } catch (error: any) {
        console.log({ error })
        res.status(500).send(error.message);
    }
}

const getTotalProducts = async (req: Req, res: Response) => {

    const idusrmob = req.idusrmob;
    if (!idusrmob) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
        return;
    };

    const pool = await dbConnection(idusrmob);

    try {

        const result = await pool.query(productQuerys.getTotalProducts);
        const total = result.rows[0].count;

        res.json({
            total
        });
    } catch (error: any) {
        console.log({ error })
        res.status(500).send(error.message);

    }
};

const getProductByClave = async (req: Req, res: Response) => {

    const idusrmob = req.idusrmob;
    if (!idusrmob) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
        return;
    };

    const pool = await dbConnection(idusrmob);

    try {
        const { clave } = req.query;

        const result = await pool.query(productQuerys.getProductByClave, [clave]);
        const product = result.rows.length > 0 ? result.rows[0] : result.rows;

        res.json({
            product
        })

    } catch (error: any) {
        console.log({ error })
        res.status(500).send(error.message);
    }
}

const getProductById = async (req: Req, res: Response) => {

    const idusrmob = req.idusrmob;
    if (!idusrmob) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
        return;
    };
    const pool = await dbConnection(idusrmob);

    try {
        const { idinvearts } = req.query;

        console.log({idinvearts})
        const result = await pool.query(productQuerys.getProductById, [idinvearts]);
        const product = result.rows.length > 0 ? result.rows[0] : result.rows;

        res.json({
            product
        })

    } catch (error) {
        console.log({ error })
    }
}

const getProducByCodebar = async (req: Req, res: Response) => {

    const idusrmob = req.idusrmob;
    if (!idusrmob) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
        return;
    };

    const pool = await dbConnection(idusrmob);

    try {
        const { codbarras } = req.query;

        const result = await pool.query(productQuerys.getProductByCodebar, [codbarras]);
        const product = result.rows.length > 0 ? result.rows[0] : result.rows;

        res.json({ product });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const updateProduct = async (req: Req, res: Response) => {
    const idusrmob = req.idusrmob;
    if (!idusrmob) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
        return;
    };

    const pool = await dbConnection(idusrmob);
    const client = await pool.connect();
    if (!client) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
        return;
    }

    try {
        const { ...updateFields } = req.body;
        const { idinvearts } = req.params;

        if (!idinvearts) {
            return res.status(400).json({ error: 'El campo idinvearts es requerido' });
        }

        const setClauses = Object.keys(updateFields)
            .map((key, index) => `${key} = $${index + 2}`)
            .join(', ');
        const values = [idinvearts, ...Object.values(updateFields)];

        const query = productQuerys.updateProduct.replace('$SET_CLAUSES', setClauses);

        await client.query('BEGIN');

        await client.query(query, values);

        await client.query('COMMIT');

        res.json({ success: true, message: 'Producto actualizado correctamente' });

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    } finally {
        client.release();
    }
};

const updateProductCodebar = async (req: Req, res: Response) => {

    const idusrmob = req.idusrmob;
    if (!idusrmob) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
        return;
    };

    const pool = await dbConnection(idusrmob);
    const client = await pool.connect();
    if (!client) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
        return;
    }

    try {
        const { codbarras } = req.body;
        const { idinvearts } = req.params;
        let codbar = codbarras

        if (!idinvearts) {
            return res.status(400).json({ error: 'El campo idinvearts es requerido' });
        }

        let isEAN13 = false;
        if (codbar) {
            isEAN13 = verifyIfIsEAN13(codbar)
        }

        if (isEAN13) {
            codbar = codbar?.substring(1)
        }

        await client.query('BEGIN');

        await client.query(productQuerys.updateCodebarProduct, [codbar, idinvearts]);

        await client.query('COMMIT');

        res.json({ success: true, message: 'Producto actualizado correctamente' });

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    } finally {
        client.release();
    }
}


export {
    getProducts,
    getTotalProducts,
    getProductByClave,
    getProductById,
    getProducByCodebar,
    updateProduct,
    updateProductCodebar
}