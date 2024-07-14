import { Response } from 'express';
import { dbConnection } from "../database/connection";
import { querys } from '../querys/querys';
import { generateJWT } from '../helpers/generate-jwt';
import { Req } from '../helpers/validate-jwt';
import { searchQuerys } from '../querys/searchQuery';


const searchProduct = async (req: Req, res: Response) => {

    try {
        const pool = await dbConnection();

        if (!pool) {
            res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
            return;
        }

        const { term } = req.params;


        const result = await pool.query(searchQuerys.searchProduct, [term]);
        const products = result.rows;

        res.json({
            products
        })

    } catch (error: any) {
        console.log({ error })
        return res.status(500).json({ error: error.message || 'Unexpected error' });
    }
}


export {
    searchProduct
}