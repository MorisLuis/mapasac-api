import { Response } from "express";
import { dbConnection } from "../database/connection";
import { productQuerys } from "../querys/productQuery";
import { identifyBarcodeType } from "../utils/identifyBarcodeType";
import { Req } from "../helpers/validate-jwt";
import ProductSellsFamilyInterface from "../interface/productSell";


// Module 1 - Inventory
const getProducts = async (req: Req, res: Response) => {

    const idusrmob = req.idusrmob;
    if (!idusrmob) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
        return;
    };

    const pool = await dbConnection({ idusrmob });

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

    const pool = await dbConnection({ idusrmob });

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

    const pool = await dbConnection({ idusrmob });

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

    const idusrmob = req.idusrmob;
    if (!idusrmob) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
        return;
    };
    const pool = await dbConnection({ idusrmob });

    try {
        const { idinvearts } = req.query;

        const result = await pool.query(productQuerys.getProductById, [idinvearts]);
        const product = result.rows[0]

        res.json({ product })

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

    const pool = await dbConnection({ idusrmob });

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

    const pool = await dbConnection({ idusrmob });
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

    const pool = await dbConnection({ idusrmob });
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
        console.error('Error:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    } finally {
        client.release();
    }
}

// Module 2 - Sells

const getProductsSells = async (req: Req, res: Response) => {
    const idusrmob = req.idusrmob;
    if (!idusrmob) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
        return;
    }

    const pool = await dbConnection({ idusrmob, database: "mercado" });

    try {
        const { limit, page } = req.query;

        const result = await pool.query(productQuerys.getProductsSells, [page, limit]);
        const products = result.rows.map((product: any) => {
            if (product.imagen) {
                product.imagen = Buffer.from( product.imagen, 'base64').toString();
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


const getTotalProductsSells = async (req: Req, res: Response) => {

    const idusrmob = req.idusrmob;
    if (!idusrmob) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
        return;
    };

    const pool = await dbConnection({ idusrmob, database: "mercado" });

    try {

        const result = await pool.query(productQuerys.getTotalProductsSells);
        const total = result.rows[0].count;

        res.json({
            total
        });
    } catch (error: any) {
        console.log({ error })
        res.status(500).send(error.message);
    }
}

const getProductsSellsFromFamily = async (req: Req, res: Response) => {
    const idusrmob = req.idusrmob;
    if (!idusrmob) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
        return;
    };

    const pool = await dbConnection({ idusrmob, database: "mercado" });

    try {
        const { cvefamilia } = req.query;

        const result = await pool.query(productQuerys.getProductsSellsFromFamily, [cvefamilia]);
        const products : ProductSellsFamilyInterface[] = result.rows;

        res.json({
            products
        })

    } catch (error: any) {
        console.log({ error })
        res.status(500).send(error.message);
    }
}




export {
    // Module 1 - Inventory
    getProducts,
    getTotalProducts,
    getProductByClave,
    getProductById,
    getProducByCodebar,
    updateProduct,
    updateProductCodebar,

    // Module 2 - Sells
    getProductsSells,
    getTotalProductsSells,
    getProductsSellsFromFamily
}