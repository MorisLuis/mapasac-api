import { Request, Response } from 'express';
import { dbConnectionInitial } from '../database/connection';
import { utilsQuery } from '../querys/utilsQuery';

const handleErrorsFrontend = async (req: Request, res: Response) => {

    try {
        const pool = await dbConnectionInitial();
        const { Message, Id_Usuario, Metodo, code, From } = req.body;
        const sendMessage = `${code} / ${From} / ${Metodo} / ${Message}`
        await pool.query('BEGIN');
        await pool.query(utilsQuery.insertErrorFrontend, [Id_Usuario, sendMessage]);
        await pool.query('COMMIT');
        return res.json({ ok: true })

    } catch (error: any) {
        console.log({ error })
        return res.status(500).send(error.message);
    }

};

const handleErrorsBackend = async (req: Request, res: Response) => {

    try {
        const pool = await dbConnectionInitial();
        const { Message, Id_Usuario, Metodo, code, From } = req.body;
        const sendMessage = `${code} / ${From} / ${Metodo} / ${Message}`
        await pool.query('BEGIN');
        await pool.query(utilsQuery.insertErrorBackend, [Id_Usuario, sendMessage]);
        await pool.query('COMMIT');
        return res.json({ ok: true })

    } catch (error: any) {
        console.log({ error })
        return res.status(500).send(error.message);
    };
}


export {
    handleErrorsFrontend,
    handleErrorsBackend
}