import { Response } from 'express';
import { dbConnection, getGlobalPool } from "../database/connection";
import { Req } from '../helpers/validate-jwt';
import { searchQuerys } from '../querys/searchQuery';
import { Pool } from 'pg';
import { handleGetSession } from '../utils/Redis/getSession';


const searchProduct = async (req: Req, res: Response) => {

    // Get session from REDIS.
    const sessionId = req.sessionID;
    const { user: userFR } = await handleGetSession({ sessionId });
    if (!userFR) {
        return res.status(401).json({ error: 'Sesion terminada' });
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await getGlobalPool(connection);

    try {
        const { term } = req.query;

        let searchTerm;
        if (!term) {
            searchTerm = "a"
        } else {
            searchTerm = term
        }

        const result = await pool.query(searchQuerys.searchProduct, [searchTerm]);
        const products = result.rows;

        res.json({
            products
        })

    } catch (error: any) {
        console.log({ error })
        return res.status(500).json({ error: error.message || 'Unexpected error' });
    }

};


const searchProductInBag = async (req: Req, res: Response) => {

    const { mercado } = req.query;

    // Get session from REDIS.
    const sessionId = req.sessionID;
    const { user: userFR } = await handleGetSession({ sessionId });
    if (!userFR) {
        return res.status(401).json({ error: 'Sesion terminada' });
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await getGlobalPool(connection);

    try {
        const { term, opcion } = req.query;
        const idusrmob = req.idusrmob;

        let searchTerm;
        if (!term) {
            searchTerm = ""
        } else {
            searchTerm = term
        }

        const result = await pool.query(
            mercado === 'true' ? searchQuerys.searchProductInBagSells : searchQuerys.searchProductInBag,
            [opcion, idusrmob, searchTerm]
        );
        const products = result.rows;

        res.json({
            products
        })

    } catch (error: any) {
        console.log({ error })
        res.status(500).send(error.message);
    }
};

const searchClients = async (req: Req, res: Response) => {

    // Get session from REDIS.
    const sessionId = req.sessionID;
    const { user: userFR } = await handleGetSession({ sessionId });
    if (!userFR) {
        return res.status(401).json({ error: 'Sesion terminada' });
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await getGlobalPool(connection);

    try {
        const { term } = req.query;

        let searchTerm;
        if (!term) {
            searchTerm = "a"
        } else {
            searchTerm = term
        }

        const result = await pool.query(searchQuerys.searchClients, [searchTerm]);
        const clients = result.rows;

        res.json({
            clients
        })

    } catch (error: any) {
        console.log({ error })
        return res.status(500).json({ error: error.message || 'Unexpected error' });
    }

};




export {
    searchProduct,
    searchProductInBag,
    searchClients
}