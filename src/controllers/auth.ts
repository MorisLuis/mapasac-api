import { Response } from 'express';
import { dbConnection, dbConnectionInitial } from "../database/connection";
import { querys } from '../querys/querys';
import { generateJWT } from '../helpers/generate-jwt';
import { Req } from '../helpers/validate-jwt';


const login = async (req: Req, res: Response) => {

    const pool = await dbConnection({});
    if (!pool) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
        return;
    };
    const client = await pool.connect();
    if (!client) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
        return;
    }

    try {
        const { usr, pas } = req.body;

        if (usr.trim() === "" || pas.trim() === "") {
            return res.status(400).json({ error: 'Necesario escribir usuario y contraseña' });
        }

        const userName = usr.toUpperCase()
        const result = await pool.query(querys.auth, [userName]);
        const user = result.rows[0]

        if (!user) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }

        if (user.pas.trim() !== pas) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        const token = await generateJWT({
            idusrmob: user.idusrmob,
        });

        res.json({
            user,
            token
        })

    } catch (error: any) {
        console.log({ error })
        return res.status(500).json({ error: error.message || 'Unexpected error' });
    } finally {
        client.release();
    }
}


const renewLogin = async (req: Req, res: Response) => {
    const idusrmob = req.idusrmob;
    const pool = await dbConnection({ database: 'desarrollo' });

    if (!idusrmob) {
        return res.status(400).json({ error: 'No se pudo establecer la conexión con el usuario' });
    }

    /* const client = await pool.connect();
    if (!client) {
        return res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
    } */

    try {
        const result = await pool.query(querys.getUserById, [idusrmob]);
        const user = result.rows[0];
        const token = await generateJWT({ idusrmob });

        res.json({ user, token });

    } catch (error: any) {
        console.error('Error in renewLogin:', error);
        res.status(500).send(error.message);
    } /* finally {
        pool.release(); // Asegúrate de liberar el cliente siempre
    } */
}

const getModules = async (req: Req, res: Response) => {

    const idusrmob = req.idusrmob;

    if (!idusrmob) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
        return;
    };

    const pool = await dbConnectionInitial();
    const client = await pool.connect();
    if (!client) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
        return;
    }

    try {
        const result = await pool.query(querys.getModules, [idusrmob]);
        const modules = result.rows;

        res.json({
            modules
        })
    } catch (error: any) {
        console.log({ error })
        res.status(500).send(error.message);
    } finally {
        client.release();
    }
}

export {
    login,
    renewLogin,
    getModules
};

