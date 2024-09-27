import { Request, Response } from 'express';
import sql from 'mssql';
import { dbConnectionInitial } from '../database/connection';
import { querys } from '../querys/querys';

const handleErrors = async (req: Request, res: Response) => {

    try {
        const pool = await dbConnectionInitial();
        const { From, Message, Id_Usuario, Metodo, code } = req.body;

        await pool.query('BEGIN');
        await pool.query(querys.postError, [From, Message, Id_Usuario, Metodo, code]);
        await pool.query('COMMIT');

        return res.json({
            ok: true
        })

    } catch (error: any) {
        console.log({ error })
        return res.status(500).send(error.message);
    }

}

export {
    handleErrors
}