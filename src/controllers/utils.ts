import { Request, Response } from "express";
import { dbConnection } from "../database/connection";
import fs from 'fs';
import path from 'path';
import { imageBinary } from "../image";



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
    utilsController
}