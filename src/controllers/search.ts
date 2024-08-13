import { Response } from 'express';
import { dbConnection } from "../database/connection";
import { Req } from '../helpers/validate-jwt';
import { searchQuerys } from '../querys/searchQuery';


const searchProduct = async (req: Req, res: Response) => {

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
    } finally {
        client.release();
    }

};


const searchProductInBag = async (req: Req, res: Response) => {

    const idusrmob = req.idusrmob;
    const { mercado } = req.query;

    if (!idusrmob) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
        return;
    };


    let pool;
    if (mercado === 'true') {
        pool = await dbConnection({ idusrmob, database: "mercado" });
    } else {
        pool = await dbConnection({ idusrmob });
    }

    const client = await pool.connect();
    if (!client) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
        return;
    }

    try {
        const { term, opcion } = req.query;
        const idusrmob = req.idusrmob;

        let searchTerm;
        if (!term) {
            searchTerm = "a"
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
    } finally {
        client.release();
    }
};



export {
    searchProduct,
    searchProductInBag
}