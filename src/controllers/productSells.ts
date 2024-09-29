import { Response } from "express";
import { Req } from "../helpers/validate-jwt";
import { handleGetSession } from "../utils/Redis/getSession";
import { getGlobalPool } from "../database/connection";
import ProductSellsFamilyInterface from "../interface/productSell";
import { productSellsQuerys } from "../querys/products/productSellsQuery";


// Module 2 - Sells
const getProductsSells = async (req: Req, res: Response) => {

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

        const result = await pool.query(productSellsQuerys.getProductsSells, [page, limit]);
        const products = result.rows.map((product: any) => {
            if (product.imagen) {
                product.imagen = Buffer.from(product.imagen, 'base64').toString();
            }
            return product;
        });

        res.json({
            products
        });

    } catch (error: any) {
        console.log({ error });
        res.status(500).send(error.message);
    }
};

const getProductsSellsFromFamily = async (req: Req, res: Response) => {
    //This controller show just the clases and capas.
    // Get session from REDIS.
    const sessionId = req.sessionID;
    const { user: userFR } = await handleGetSession({ sessionId });
    if (!userFR) {
        return res.status(401).json({ error: 'Sesion terminada' });
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await getGlobalPool(connection);

    try {
        const { cvefamilia } = req.query;

        const result = await pool.query(productSellsQuerys.getProductsSellsFromFamily, [cvefamilia]);
        const products: ProductSellsFamilyInterface[] = result.rows;

        res.json({
            products
        })

    } catch (error: any) {
        console.log({ error })
        res.status(500).send(error.message);
    }
}

const getProductByEnlacemob = async (req: Req, res: Response) => {

        // Get session from REDIS.
        const sessionId = req.sessionID;
        const { user: userFR } = await handleGetSession({ sessionId });
        if (!userFR) {
            return res.status(401).json({ error: 'Sesion terminada' });
        }
        const { idusrmob, ...connection } = userFR;
        const pool = await getGlobalPool(connection);

    try {
        const { idinvearts, idinveclas, capa } = req.query;

        const result = await pool.query(productSellsQuerys.getProductByEnlacemob, [idinvearts, idinveclas, capa]);
        const product = result.rows[0];
        res.json({ product });

    } catch (error: any) {
        console.log({ error })
        res.status(500).send(error.message);
    }
}

const getUnits = async (req: Req, res: Response) => {

    // Get session from REDIS.
    const sessionId = req.sessionID;
    const { user: userFR } = await handleGetSession({ sessionId });
    if (!userFR) {
        return res.status(401).json({ error: 'Sesion terminada' });
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await getGlobalPool(connection);

    try {

        const result = await pool.query(productSellsQuerys.getUnits);
        const units = result.rows
        res.json({ units })

    } catch (error: any) {
        res.status(500).send(error.message);
    }
}

const getTotalProductsSells = async (req: Req, res: Response) => {

    // Get session from REDIS.
    const sessionId = req.sessionID;
    const { user: userFR } = await handleGetSession({ sessionId });
    if (!userFR) {
        return res.status(401).json({ error: 'Sesion terminada' });
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await getGlobalPool(connection);

    try {
        const result = await pool.query(productSellsQuerys.getTotalProductsSells);
        const total = result.rows[0].total;

        res.json({
            total
        });
    } catch (error: any) {
        console.log({ "error-getTotalClassesSells": error })
        res.status(500).send(error.message);
    }
}

const getTotalClassesSells = async (req: Req, res: Response) => {
    // Get session from REDIS.
    const sessionId = req.sessionID;
    const { user: userFR } = await handleGetSession({ sessionId });
    if (!userFR) {
        return res.status(401).json({ error: 'Sesion terminada' });
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await getGlobalPool(connection);

    const { cvefamilia } = req.query;

    try {
        const result = await pool.query(productSellsQuerys.getTotalClassesSells, [cvefamilia]);
        const total = result.rows[0].count;

        res.json({
            total
        });
    } catch (error: any) {
        console.log({ "error-getTotalClassesSells": error })
        res.status(500).send(error.message);
    }
}

//TEMPORAL
const getIdinveartsProduct = async (req: Req, res: Response) => {

    // Get session from REDIS.
    const sessionId = req.sessionID;
    const { user: userFR } = await handleGetSession({ sessionId });
    if (!userFR) {
        return res.status(401).json({ error: 'Sesion terminada' });
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await getGlobalPool(connection);

    try {
        const { cvefamilia } = req.query;

        const result = await pool.query(productSellsQuerys.getIdinveartsProduct, [cvefamilia]);
        const product = result.rows[0];
        res.json({ product });

    } catch (error: any) {
        res.status(500).send(error.message);
    }
}

// Module 3 - Sells Restaurants
const getProductsSellsRestaurant = async (req: Req, res: Response) => {

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

        const result = await pool.query(productSellsQuerys.getProductsSellsRestaurant, [page, limit]);
        const products = result.rows.map((product: any) => {
            if (product.imagen) {
                product.imagen = Buffer.from(product.imagen, 'base64').toString();
            }
            return product;
        });

        res.json({
            products
        });

    } catch (error: any) {
        console.log({ error });
        res.status(500).send(error.message);
    }
};

const getProductSellsRestaurantDetails = async (req: Req, res: Response) => {
    //This controller show just the clases and capas.
    // Get session from REDIS.
    const sessionId = req.sessionID;
    const { user: userFR } = await handleGetSession({ sessionId });
    if (!userFR) {
        return res.status(401).json({ error: 'Sesion terminada' });
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await getGlobalPool(connection);

    try {
        const { cvefamilia } = req.query;

        const result = await pool.query(productSellsQuerys.getProductSellsRestaurantDetails, [cvefamilia]);
        const products = result.rows;

        res.json({
            products
        })

    } catch (error: any) {
        console.log({ error })
        res.status(500).send(error.message);
    }
};

const getTotalProductsSellsRestaurant = async (req: Req, res: Response) => {

    // Get session from REDIS.
    const sessionId = req.sessionID;
    const { user: userFR } = await handleGetSession({ sessionId });
    if (!userFR) {
        return res.status(401).json({ error: 'Sesion terminada' });
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await getGlobalPool(connection);

    try {
        const result = await pool.query(productSellsQuerys.getTotalProductsSellsRestaurant);
        const total = result.rows[0].total;

        res.json({
            total
        });
    } catch (error: any) {
        console.log({ "error-getTotalClassesSells": error })
        res.status(500).send(error.message);
    }
}


export {
    // Module 2 - Sells
    getProductsSells,
    getTotalProductsSells,
    getTotalClassesSells,
    getProductsSellsFromFamily,
    getUnits,
    getProductByEnlacemob,
    getIdinveartsProduct,

    // Module 3 - Sells Restaurants
    getProductsSellsRestaurant,
    getProductSellsRestaurantDetails,
    getTotalProductsSellsRestaurant
}