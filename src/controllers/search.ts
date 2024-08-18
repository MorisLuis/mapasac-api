import { Response } from 'express';
import { dbConnection } from "../database/connection";
import { Req } from '../helpers/validate-jwt';
import { searchQuerys } from '../querys/searchQuery';
import { Pool } from 'pg';


const searchProduct = async (req: Req, res: Response) => {

    const idusrmob = req.idusrmob;
    if (!idusrmob) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
        return;
    };

    const pool = await dbConnection({ idusrmob });

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

    const idusrmob = req.idusrmob;
    const { mercado } = req.query;

    if (!idusrmob) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
        return;
    };

    let pool: Pool;
    try {
        pool = await dbConnection({ idusrmob, database: mercado === 'true' ? "mercado" : undefined });
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        return res.status(500).json({ error: 'Error al conectar a la base de datos' });
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
    }
};



export {
    searchProduct,
    searchProductInBag
}