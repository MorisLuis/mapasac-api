import { Request, Response } from "express";
import { dbConnection } from "../database/connection";
import { productQuerys } from "../querys/productQuery";


const getProducts = async (req: Request, res: Response) => {

    try {
        const pool = await dbConnection();

        if (!pool) {
            res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
            return;
        }

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

const getTotalProducts = async (req: Request, res: Response) => {

    try {
        const pool = await dbConnection();

        if (!pool) {
            res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
            return;
        }

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


const getProductByClave = async (req: Request, res: Response) => {

    try {
        const pool = await dbConnection();

        if (!pool) {
            res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
            return;
        }

        const { clave } = req.query;

        const result = await pool.query(productQuerys.getProductByClave, [clave]);
        const product = result.rows[0];

        res.json({
            product
        })

    } catch (error: any) {
        console.log({ error })
        res.status(500).send(error.message);
    }
}

const getProductById = async (req: Request, res: Response) => {

    try {
        const pool = await dbConnection();

        if (!pool) {
            res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
            return;
        }

        const { idinvearts } = req.query;

        const result = await pool.query(productQuerys.getProductById, [idinvearts]);
        const product = result.rows[0];

        res.json({
            product
        })

    } catch (error) {
        console.log({ error })
    }
}

const getProducByCodebar = async (req: Request, res: Response) => {
    try {
        const pool = await dbConnection();

        if (!pool) {
            res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
            return;
        }

        const { codbarras } = req.query;

        const result = await pool.query(productQuerys.getProductByCodebar, [codbarras]);
        const product = result.rows[0];
        
        res.json({ product });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const updateProduct = async (req: Request, res: Response) => {

    try {
        const pool = await dbConnection();

        if (!pool) {
            res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
            return;
        }

        const { ...updateFields } = req.body;
        const { idinvearts } = req.params;

        if (!idinvearts) {
            return res.status(400).json({ error: 'El campo idinvearts es requerido' });
        }

        // Construir el query dinámicamente.
        const setClauses = Object.keys(updateFields)
            .map((key, index) => `${key} = $${index + 2}`)
            .join(', ');
        const values = [idinvearts, ...Object.values(updateFields)];

        const query = productQuerys.updateProduct.replace('$SET_CLAUSES', setClauses);
        await pool.query(query, values);

        res.json({ success: true, message: 'Producto actualizado correctamente'});
    
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}


export {
    getProducts,
    getTotalProducts,
    getProductByClave,
    getProductById,
    getProducByCodebar,
    updateProduct
}