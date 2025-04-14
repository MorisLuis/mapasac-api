import type { Pool } from 'pg';
import { querys } from '../querys/querys';
import type { UserSessionInterface } from '../interface/user';
import { dbConnectionInitial } from '../database/connection';
import { NotFoundError, ValidationError } from '../errors/CustomError';
import { v4 } from 'uuid';
import { generateAccessToken, generateRefreshToken } from '../helpers/generate-jwt';
import { generateRedisSession } from '../helpers/generate-redis';

const loginService = async (usr: string, pas: string): Promise<{ user: UserSessionInterface, token: string, refreshToken: string }> => {

    const pool: Pool = await dbConnectionInitial();
    if (!pool) {
        throw new ValidationError('No se pudo establecer la conexión con la base de datos');
    }

    // Validar que el usuario no esté vacío
    if (usr.trim() === "" || pas.trim() === "") {
        throw new ValidationError('Necesario escribir usuario y contraseña');
    }

    const userName = usr.toUpperCase();
    const result = await pool.query(querys.auth, [userName]);
    const user = result.rows[0];

    if (!user) {
        throw new NotFoundError('Usuario no encontrado');
    }

    // Validar contraseña
    if (user.pas.trim() !== pas) {
        throw new NotFoundError('Contraseña incorrecta');
    }

    const sessionId = v4();

    await generateRedisSession(sessionId, user)

    // Generar JWT
    const token = generateAccessToken(sessionId);
    const refreshToken = generateRefreshToken(sessionId);

    const response: { user: UserSessionInterface, token: string, refreshToken: string } = { user, token, refreshToken };
    return response;
};

export {
    loginService
}