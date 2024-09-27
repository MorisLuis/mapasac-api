import { Response } from 'express';
import { closeGlobalPool, dbConnection, dbConnectionInitial, getGlobalPool } from "../database/connection";
import { querys } from '../querys/querys';
import { generateJWT } from '../helpers/generate-jwt';
import { Req } from '../helpers/validate-jwt';
import { UserSessionInterface } from '../interface/user';
import { handleGetSession } from '../utils/Redis/getSession';
import { handleDeleteRedisSession } from '../utils/Redis/deleteRedis';

const login = async (req: Req, res: Response) => {

    const pool = await dbConnectionInitial();
    if (!pool) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
        return;
    };

    try {
        const { usr, pas } = req.body;

        if (usr.trim() === "" || pas.trim() === "") {
            return res.status(400).json({ error: 'Necesario escribir usuario y contraseña' });
        }

        const userName = usr.toUpperCase()
        const result = await pool.query(querys.auth, [userName]);
        const user = result.rows[0] as UserSessionInterface;

        if (!user) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }

        if (!req.session) {
            return res.status(500).json({ error: 'Sesión no inicializada' });
        }

        (req.session as any).user = {
            idusrmob: user?.idusrmob,
            usr: user?.usr,
            pas: user?.pas,
            svr: user?.svr,
            dba: user?.dba,
            port: user?.port,
            usrdba: user?.usrdba,
            pasdba: user?.pasdba,
            empresa: user?.empresa,
            razonsocial: user?.razonsocial
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
        await pool.end();
        await closeGlobalPool()
    }
}

const renewLogin = async (req: Req, res: Response) => {

    // Get session from REDIS.
    const sessionId = req.sessionID;
    const { user: userFR } = await handleGetSession({ sessionId });

    if (!userFR) {
        return res.status(401).json({ error: 'Sesion terminada' });
    }

    const { idusrmob } = userFR;

    const pool = await dbConnectionInitial();

    if (!idusrmob) {
        return res.status(400).json({ error: 'No se pudo establecer la conexión con el usuario' });
    }

    try {
        const result = await pool.query(querys.getUserById, [idusrmob]);
        const user = result.rows[0];
        const token = await generateJWT({ idusrmob });

        res.json({ user, token });

    } catch (error: any) {
        console.error('Error in renewLogin:', error);
        res.status(500).send(error.message);
    } finally {
        await pool.end();
    }
}

const logout = async (req: Req, res: Response) => {
    const sessionId = req.sessionID;
    const { user: userFR } = await handleGetSession({ sessionId });

    if (!userFR) {
        return res.status(401).json({ error: 'Sesion terminada' });
    }

    if (!sessionId) {
        return res.status(401).json({ error: 'Sesion terminada' });
    }

    const { idusrmob, ...connection } = userFR;

    const pool = await getGlobalPool(connection);

    console.log({ pool })


    try {
        // Eliminar la sesión de Redis
        await handleDeleteRedisSession({ sessionId });

        // Cerrar el pool de conexiones de PostgreSQL
        //await pool.end();

        res.json({ ok: true });
    } catch (error: any) {
        console.error('Error en logout:', error);
        res.status(500).send(error.message);
    }
};

const getModules = async (req: Req, res: Response) => {
    const idusrmob = req.idusrmob;

    if (!idusrmob) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
        return;
    };

    const pool = await dbConnectionInitial();
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
        await pool.end();
    }
}

export {
    login,
    renewLogin,
    logout,
    getModules
};

