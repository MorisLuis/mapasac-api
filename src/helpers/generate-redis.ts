import redisClient from "../config/redisClient";
import { UserSessionInterface } from "../interface/user";
import { AppError, NotFoundError } from "../errors/CustomError";


// Generar sesion de redis.
export const generateRedisSession = async (sessionId: string, datosDelUsuario: UserSessionInterface): Promise<string | null> => {
    try {
        const result = await redisClient.set(`session:${sessionId}`, JSON.stringify(datosDelUsuario), 'EX', 3600);
        if (!result) {
            throw new AppError('Error al generar la sesión en Redis', 500);
        }
        return result;
    } catch (error) {
        throw new AppError(`Error en generateRedisSession: ${error}`, 500);
    }
};


// Obtener la sesión desde Redis
export const getRedisSession = async (sessionId: string): Promise<UserSessionInterface | null> => {
    try {
        const sessionData = await redisClient?.get(`session:${sessionId}`);
        if (!sessionData) {
            throw new NotFoundError('Sesión no encontrada en Redis');
        }
        return JSON.parse(sessionData);
    } catch (error) {
        throw new AppError(`Error en generateRedisSession: ${error}`, 500);
    }
};


// Actualizar la sesión en Redis
export const updateSession = async (
    sessionId: string,
    newData: Partial<UserSessionInterface>
): Promise<UserSessionInterface> => {
    try {
        let session = await getRedisSession(sessionId);

        if (!session) {
            throw new NotFoundError('Sesión no encontrada en Redis');
        }

        session = { ...session, ...newData };

        const result = await redisClient.set(`session:${sessionId}`, JSON.stringify(session), 'EX', 3600);

        if (!result) {
            throw new AppError('Error al actualizar la sesión en Redis', 500);
        }

        return session;
    } catch (error) {
        throw new AppError(`Error en updateSession: ${error}`, 500);
    }
};



// Eliminar la sesión en Redis.
export const handleDeleteRedisSession = async (sessionId: string): Promise<void> => {
    try {
        const response = await redisClient.del(`session:${sessionId}`);

        if (response === 0) {
            throw new NotFoundError('Sesión no encontrada en Redis');
        }

        console.log(`✅ Sesión ${sessionId} eliminada exitosamente`);
    } catch (error) {
        throw new AppError(`Error en handleDeleteRedisSession: ${error}`, 500);
    }
};