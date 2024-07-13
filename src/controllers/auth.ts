import { Response } from 'express';
import { dbConnection } from "../database/connection";
import { querys } from '../querys';
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

    try {
        const pool = await dbConnection();

        if (!pool) {
            res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
            return;
        }

        const result = await pool.query(querys.getUserById, [idusrmob]);
        const user = result.rows[0]

        res.json({
            ok: true,
            user
        });

    } catch (error: any) {
        console.log({ error })
        res.status(500).send(error.message);
    }
}

export {
    login,
    renewLogin
};

