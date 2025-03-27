import { NextFunction, Request, Response } from 'express';
import { dbConnectionInitial } from '../database/connection';
import { utilsQuery } from '../querys/utilsQuery';
import { Pool } from 'pg';

const handleErrorsFrontend = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const session = req.session;

    try {
        const pool = await dbConnectionInitial();
        const { Message, Metodo } = req.body;
        const sendMessage = `${Metodo} / ${Message} / "${req.originalUrl}" / ${session.svr}`;
        await pool.query('BEGIN');
        await pool.query(utilsQuery.insertErrorFrontend, [session.idusrmob, sendMessage]);
        await pool.query('COMMIT');
        return res.json({ ok: true })

    } catch (error) {
        return next(error)
    }

};

interface ErrorsBackendInterface {
    Message: string;
    Id_Usuario: string;
    Metodo: string;
    path: string;
    svr: string;
    code: string;
}

const handleErrorsBackend = async (error: ErrorsBackendInterface): Promise<Response | void> => {

    let pool: Pool | null = null;
    try {
        pool = await dbConnectionInitial();
        const { Message, Id_Usuario, Metodo, path, svr, code } = error ?? {};

        // Formatear el mensaje de error
        const sendMessage = `${code}-${Metodo} / ${Message} / "${path}" / ${svr}`;
        await pool.query('BEGIN');
        await pool.query(utilsQuery.insertErrorBackend, [Id_Usuario, sendMessage]);
        await pool.query('COMMIT');
        return;
    } catch (err) {
        if (pool) await pool.query('ROLLBACK');
        console.error('Error al guardar el error en la base de datos:', err);
    } finally {
        if (pool) pool.end(); // Cerrar la conexión a la base de datos
    }
};

export {
    handleErrorsFrontend,
    handleErrorsBackend
}