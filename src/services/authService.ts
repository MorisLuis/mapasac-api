import { Pool } from 'pg';
import { querys } from '../querys/querys';
import { UserSessionInterface } from '../interface/user';
import { closeGlobalPool, dbConnectionInitial } from '../database/connection';
import { generateJWT } from '../helpers/generate-jwt';
import { handleGetSession } from '../utils/Redis/getSession';

const loginService = async (usr: string, pas: string) => {
    const pool: Pool = await dbConnectionInitial();
    if (!pool) {
        throw new Error('No se pudo establecer la conexión con la base de datos');
    }

    try {
        // Validar que el usuario no esté vacío
        if (usr.trim() === "" || pas.trim() === "") {
            throw new Error('Necesario escribir usuario y contraseña');
        }

        const userName = usr.toUpperCase();
        const result = await pool.query(querys.auth, [userName]);
        const user = result.rows[0] as UserSessionInterface;

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        // Validar contraseña
        if (user.pas.trim() !== pas) {
            throw new Error('Contraseña incorrecta');
        }

        // Generar JWT
        const token = await generateJWT({
            idusrmob: user.idusrmob,
        });

        return { user, token };
    } catch (error) {
        throw error;
    } finally {
        await pool.end();
        await closeGlobalPool();
    }
};


const renewLoginService = async (sessionId: string) => {

    const { user: userFR } = await handleGetSession({ sessionId });
    if (!userFR) {
        throw new Error('Sesion terminada');
    }

    const { idusrmob } = userFR;

    // Establecer la conexión con la base de datos
    const pool: Pool = await dbConnectionInitial();

    if (!idusrmob) {
        throw new Error('No se pudo establecer la conexión con el usuario');
    }

    try {
        // Consultar el usuario en la base de datos por ID
        const result = await pool.query(querys.getUserById, [idusrmob]);
        const user = result.rows[0];

        // Generar un nuevo token JWT
        const token = await generateJWT({ idusrmob });

        return { user, token };
    } catch (error) {
        throw error;
    } finally {
        await pool.end();
    }
};


export {
    loginService,
    renewLoginService
}