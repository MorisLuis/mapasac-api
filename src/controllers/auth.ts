import { Response } from 'express';
import { dbConnection, dbConnectionInitial } from "../database/connection";
import { querys } from '../querys/querys';
import { generateJWT } from '../helpers/generate-jwt';
import { Req } from '../helpers/validate-jwt';


const login = async (req: Req, res: Response) => {

    try {
        const pool = await dbConnection();

        if (!pool) {
            res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
            return;
        }

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
    }
}

const renewLogin = async (req: Req, res: Response) => {

    const idusrmob = req.idusrmob;

    if(!idusrmob) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
        return;
    };


    try {
        const pool = await dbConnection(idusrmob);

        if (!pool) {
            res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
            return;
        }

        if (!idusrmob) {
            return res.status(401).json({ message: 'No se encontro el id del usuario' });
        };

        const result = await pool.query(querys.getUserById, [idusrmob]);
        const user = result.rows[0]
        const token = await generateJWT({
            idusrmob: idusrmob,
        });

        res.json({
            user,
            token
        });

    } catch (error: any) {
        console.log({ error })
        res.status(500).send(error.message);
    }
}

const getModules = async (req: Req, res: Response) => {

    const idusrmob = req.idusrmob;

    console.log({idusrmob})
    if(!idusrmob) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
        return;
    };

    try {
        //const pool = await dbConnection(idusrmob);
        const pool = await dbConnectionInitial();

        if (!pool) {
            res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
            return;
        }

        const result = await pool.query(querys.getModules, [idusrmob]);
        const modules = result.rows;

        res.json({
            modules
        })

    } catch (error: any) {
        console.log({ error })
        res.status(500).send(error.message);
    }
}

export {
    login,
    renewLogin,
    getModules
};

