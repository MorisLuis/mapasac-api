import { Request, Response } from 'express';
import { dbConnectionInitial } from '../database/connection';
import { utilsQuery } from '../querys/utilsQuery';
import { Pool } from 'pg';
import { handleGetSession } from '../utils/Redis/getSession';

const handleErrorsFrontend = async (req: Request, res: Response) => {
    const sessionId = req.sessionID;
    const { user: userFR } = await handleGetSession({ sessionId });
    if(!userFR) return;

    try {
        const pool = await dbConnectionInitial();
        const { Message, Metodo } = req.body;
        const sendMessage = `${Metodo} / ${Message} / "${req.originalUrl}" / ${userFR.svr}`;
        await pool.query('BEGIN');
        await pool.query(utilsQuery.insertErrorFrontend, [userFR.idusrmob, sendMessage]);
        await pool.query('COMMIT');
        return res.json({ ok: true })

    } catch (error: any) {
        console.log({ error })
        return res.status(500).send(error.message);
    }

};

const handleErrorsBackend = async (error: any) => {
    let pool: Pool | null = null;
    try {
        pool = await dbConnectionInitial();
        const { Message, Id_Usuario, Metodo, path, svr } = error ?? {};

        // Formatear el mensaje de error
        const sendMessage = `${Metodo} / ${Message} / "${path}" / ${svr}`;
        console.log({sendMessage})
        await pool.query('BEGIN');
        await pool.query(utilsQuery.insertErrorBackend, [Id_Usuario, sendMessage]);
        await pool.query('COMMIT');

    } catch (err: any) {
        if (pool) {
            await pool.query('ROLLBACK');
        }
        console.error('Error al guardar el error en la base de datos:', err);

    } finally {
        if (pool) {
            pool.end(); // Cerrar la conexión a la base de datos
        }
    }
};

export default handleErrorsBackend;

export {
    handleErrorsFrontend,
    handleErrorsBackend
}