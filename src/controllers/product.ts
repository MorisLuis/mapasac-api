import { NextFunction, Request, Response } from "express";
import { productQuerys } from "../querys/productQuery";
import { identifyBarcodeType } from "../utils/identifyBarcodeType";
import { handleGetSession } from "../utils/Redis/getSession";
import { dbConnection } from "../database/connection";

// Module 1 - Inventory
const getProducts = async (req: Request, res: Response, next: NextFunction) => {

    // Get session from REDIS.
    const sessionId = req.sessionId;
    const { user: userFR } = await handleGetSession({ sessionId });
    if (!userFR) {
        return res.status(401).json({ error: 'Sesion terminada' });
    }
    const { svr, dba, pasdba, usrdba, port } = userFR;

    const config = {
        user: usrdba,
        database: dba,
        password: pasdba,
        port: port,
        host: svr
    };

    const pool = await dbConnection(config);

    try {
        const { limit, page } = req.query;

        const result = await pool.query(productQuerys.getProducts, [page, limit]);
        const products = result.rows;

        res.json({
            total: products.length,
            products
        })

    } catch (error) {
        return next(error);
    }
}

const getTotalProducts = async (req: Request, res: Response, next: NextFunction) => {

    // Get session from REDIS.
    const sessionId = req.sessionId;
    const { user: userFR } = await handleGetSession({ sessionId });
    if (!userFR) {
        return res.status(401).json({ error: 'Sesion terminada' });
    }
    const { svr, dba, pasdba, usrdba, port } = userFR;

    const config = {
        user: usrdba,
        database: dba,
        password: pasdba,
        port: port,
        host: svr
    };

    const pool = await dbConnection(config);

    try {

        const result = await pool.query(productQuerys.getTotalProducts);
        const total = result.rows[0].count;

        res.json({
            total
        });
    } catch (error) {
        return next(error);
    }
};

const getProductByClave = async (req: Request, res: Response, next: NextFunction) => {

    // Get session from REDIS.
    const sessionId = req.sessionId;
    const { user: userFR } = await handleGetSession({ sessionId });
    if (!userFR) {
        return res.status(401).json({ error: 'Sesion terminada' });
    }
    const { svr, dba, pasdba, usrdba, port } = userFR;

    const config = {
        user: usrdba,
        database: dba,
        password: pasdba,
        port: port,
        host: svr
    };

    const pool = await dbConnection(config);

    try {
        const { clave } = req.query;

        const result = await pool.query(productQuerys.getProductByClave, [clave]);
        const product = result.rows

        res.json({ product })

    } catch (error) {
        return next(error);
    }
}

const getProductById = async (req: Request, res: Response, next: NextFunction) => {

    // Get session from REDIS.
    const sessionId = req.sessionId;
    const { user: userFR } = await handleGetSession({ sessionId });
    if (!userFR) {
        return res.status(401).json({ error: 'Sesion terminada' });
    }
    const { svr, dba, pasdba, usrdba, port } = userFR;

    const config = {
        user: usrdba,
        database: dba,
        password: pasdba,
        port: port,
        host: svr
    };

    const pool = await dbConnection(config);

    try {
        const { idinvearts } = req.query;
        const result = await pool.query(productQuerys.getProductById, [idinvearts]);
        const product = result.rows[0]
        res.json({ product })

    } catch (error) {
        return next(error);
    }
}

const getProducByCodebar = async (req: Request, res: Response, next: NextFunction) => {

    // Get session from REDIS.
    const sessionId = req.sessionId;
    const { user: userFR } = await handleGetSession({ sessionId });
    if (!userFR) {
        return res.status(401).json({ error: 'Sesion terminada' });
    }
    const { svr, dba, pasdba, usrdba, port } = userFR;

    const config = {
        user: usrdba,
        database: dba,
        password: pasdba,
        port: port,
        host: svr
    };

    const pool = await dbConnection(config);

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

    } catch (error) {
        return next(error);
    }
}

const getProductByNoArticulo = async (req: Request, res: Response, next: NextFunction) => {

    // Get session from REDIS.
    const sessionId = req.sessionId;
    const { user: userFR } = await handleGetSession({ sessionId });
    if (!userFR) {
        return res.status(401).json({ error: 'Sesion terminada' });
    }
    const { svr, dba, pasdba, usrdba, port } = userFR;

    const config = {
        user: usrdba,
        database: dba,
        password: pasdba,
        port: port,
        host: svr
    };

    const pool = await dbConnection(config);

    try {
        const { noarticulo } = req.query;

        const result = await pool.query(productQuerys.getProductByNoarticulo, [noarticulo]);
        const product = result.rows

        res.json({ product })

    } catch (error) {
        return next(error);
    }
}

const updateProduct = async (req: Request, res: Response, next: NextFunction) => {

    // Get session from REDIS.
    const sessionId = req.sessionId;
    const { user: userFR } = await handleGetSession({ sessionId });
    if (!userFR) {
        return res.status(401).json({ error: 'Sesion terminada' });
    }
    const { svr, dba, pasdba, usrdba, port } = userFR;

    const config = {
        user: usrdba,
        database: dba,
        password: pasdba,
        port: port,
        host: svr
    };

    const pool = await dbConnection(config);

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
        return next(error);
    } finally {
        client.release();
    }
};

const updateProductCodebar = async (req: Request, res: Response, next: NextFunction) => {


    // Get session from REDIS.
    const sessionId = req.sessionId;
    const { user: userFR } = await handleGetSession({ sessionId });
    if (!userFR) {
        return res.status(401).json({ error: 'Sesion terminada' });
    }
    const { svr, dba, pasdba, usrdba, port } = userFR;

    const config = {
        user: usrdba,
        database: dba,
        password: pasdba,
        port: port,
        host: svr
    };

    const pool = await dbConnection(config);

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

    } catch (error) {
        await client.query('ROLLBACK');
        return next(error);
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