import { Request, Response } from 'express';
import { dbConnection } from '../database/connection';
import { querys } from '../querys';

const getProducByCodebar = async (req: Request, res: Response) => {
    try {
        const client = await dbConnection();

        if (!client) {
            res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
            return;
        }

        const { codbarras } = req.query;

        const result = await client.query(querys.getByCodebar, [codbarras]);
        const product = result.rows[0];
        
        res.json({ product });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const updateProductCodebar = async (req: Request, res: Response) => {

    try {
        const client = await dbConnection();

        if (!client) {
            res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
            return;
        }

        const { codbarras } = req.body;
        const { idinvearts } = req.query;

        if (!codbarras || !idinvearts) {
            res.status(400).json({ error: 'Parámetros inválidos' });
            return;
        }

        const result = await client.query(querys.updateCodbar, [codbarras, idinvearts]);

        if (result.rowCount === 0) {
            res.status(404).json({ error: 'Producto no encontrado' });
            return;
        }

        res.json({ message: 'Producto actualizado exitosamente' });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


export {
    getProducByCodebar,
    updateProductCodebar
};
