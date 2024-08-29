import { Request, Response } from "express";
import { dbConnection } from "../database/connection";
import fs from 'fs';
import path from 'path';
import { imageBinary } from "../image";
import { querys } from "../querys/querys";
import { Req } from "../helpers/validate-jwt";


const getPaymentType = async (req: Req, res: Response) => {

    //This controller show just the families not the products.
    const idusrmob = req.idusrmob;
    if (!idusrmob) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
        return;
    }

    const pool = await dbConnection({ idusrmob, database: "mercado" });

    try {
        const result = await pool.query(querys.getPaymentType);
        const typePayments = result.rows;

        res.json({
            typePayments: typePayments
        })

    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        return res.status(500).json({ error: 'Error al conectar a la base de datos' });
    }

    try {

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }

}

const getClients = async (req: Req, res: Response) => {

    //This controller show just the families not the products.
    const idusrmob = req.idusrmob;
    if (!idusrmob) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
        return;
    }

    const pool = await dbConnection({ idusrmob });
    try {
        const { limit, page } = req.query;
        const result = await pool.query(querys.getClients, [page, limit]);
        const clients = result.rows;

        res.json({
            clients: clients
        })

    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        return res.status(500).json({ error: 'Error al conectar a la base de datos' });
    }

    try {

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }

}



const utilsController = async (req: Request, res: Response) => {
    try {

        const binaryData = Buffer.from(imageBinary, 'base64');
        const outputImagePath = path.join(__dirname, '../', 'output.png'); // Ajusta la ruta donde quieres guardar la imagen
        fs.writeFileSync(outputImagePath, binaryData);


        res.status(200).json({ ok: true }); // Usamos base64 para representar los datos binarios como texto
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


export {
    getPaymentType,
    getClients,
    utilsController
}