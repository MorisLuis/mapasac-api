import { Response } from "express";
import { getGlobalPool } from "../database/connection";
import { productQuerys } from "../querys/products/productQuery";
import { identifyBarcodeType } from "../utils/identifyBarcodeType";
import { Req } from "../helpers/validate-jwt";
import { handleGetSession } from "../utils/Redis/getSession";


// Module 1 - Inventory
const getProducts = async (req: Req, res: Response) => {

    // Get session from REDIS.
    const sessionId = req.sessionID;
    const { user: userFR } = await handleGetSession({ sessionId });
    if (!userFR) {
        return res.status(401).json({ error: 'Sesion terminada' });
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await getGlobalPool(connection);

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

    // Get session from REDIS.
    const sessionId = req.sessionID;
    const { user: userFR } = await handleGetSession({ sessionId });
    if (!userFR) {
        return res.status(401).json({ error: 'Sesion terminada' });
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await getGlobalPool(connection);

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

    // Get session from REDIS.
    const sessionId = req.sessionID;
    const { user: userFR } = await handleGetSession({ sessionId });
    if (!userFR) {
        return res.status(401).json({ error: 'Sesion terminada' });
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await getGlobalPool(connection);

    try {
        const { clave } = req.query;

        const result = await pool.query(productQuerys.getProductByClave, [clave]);
        const product = result.rows

        res.json({ product })

    } catch (error: any) {
        console.log({ error })
        res.status(500).send(error.message);
    }
}

const getProductById = async (req: Req, res: Response) => {

    // Get session from REDIS.
    const sessionId = req.sessionID;
    const { user: userFR } = await handleGetSession({ sessionId });
    if (!userFR) {
        return res.status(401).json({ error: 'Sesion terminada' });
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await getGlobalPool(connection);

    try {
        const { idinvearts } = req.query;

        const result = await pool.query(productQuerys.getProductById, [idinvearts]);
        const product = result.rows[0]

        res.json({ product })

    } catch (error: any) {
        res.status(500).send(error.message);
    }
}

const getProducByCodebar = async (req: Req, res: Response) => {

    // Get session from REDIS.
    const sessionId = req.sessionID;
    const { user: userFR } = await handleGetSession({ sessionId });
    if (!userFR) {
        return res.status(401).json({ error: 'Sesion terminada' });
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await getGlobalPool(connection);

    try {
        const { codbarras } = req.query;
        let codbar: string = codbarras as string;

        const identifycodebarType = identifyBarcodeType(codbar)

        if (identifycodebarType === "UPC-A convertido a EAN-13") {
            codbar = codbar?.substring(1)
        }

        const result = await pool.query(productQuerys.getProductByCodebar, [codbar]);
        const product = result.rows

        res.json({ product });

    } catch (error: any) {
        console.error('Error:', error);
        res.status(500).send(error.message);
    }
}

const getProductByNoArticulo = async (req: Req, res: Response) => {

    // Get session from REDIS.
    const sessionId = req.sessionID;
    const { user: userFR } = await handleGetSession({ sessionId });
    if (!userFR) {
        return res.status(401).json({ error: 'Sesion terminada' });
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await getGlobalPool(connection);

    try {
        const { noarticulo } = req.query;

        const result = await pool.query(productQuerys.getProductByNoarticulo, [noarticulo]);
        const product = result.rows

        res.json({ product })

    } catch (error: any) {
        console.log({ error })
        res.status(500).send(error.message);
    }
}

const updateProduct = async (req: Req, res: Response) => {

    // Get session from REDIS.
    const sessionId = req.sessionID;
    const { user: userFR } = await handleGetSession({ sessionId });
    if (!userFR) {
        return res.status(401).json({ error: 'Sesion terminada' });
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await getGlobalPool(connection);

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

    } catch (error: any) {
        await client.query('ROLLBACK');
        console.error('Error:', error);
        res.status(500).send(error.message);
    } finally {
        client.release();
    }
};

const updateProductCodebar = async (req: Req, res: Response) => {


    // Get session from REDIS.
    const sessionId = req.sessionID;
    const { user: userFR } = await handleGetSession({ sessionId });
    if (!userFR) {
        return res.status(401).json({ error: 'Sesion terminada' });
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await getGlobalPool(connection);

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

        const identifycodebarType = identifyBarcodeType(codbar)

        if (identifycodebarType === "UPC-A convertido a EAN-13") {
            codbar = codbar?.substring(1)
        }

        await client.query('BEGIN');

        await client.query(productQuerys.updateCodebarProduct, [codbar, idinvearts]);

        await client.query('COMMIT');

        res.json({ success: true, message: 'Producto actualizado correctamente' });

    } catch (error: any) {
        await client.query('ROLLBACK');
        console.error('Error:', error);
        res.status(500).send(error.message);
    } finally {
        client.release();
    }
}


export {
    // Module 1 - Inventory
    getProducts,
    getTotalProducts,
    getProductByClave,
    getProductByNoArticulo,
    getProductById,
    getProducByCodebar,
    updateProduct,
    updateProductCodebar
}