import { Pool } from "pg";
import { dbConnectionInitial, getGlobalPool } from "../database/connection";
import { utilsQuery } from "../querys/utilsQuery";
import { handleGetSession } from "../utils/Redis/getSession";

const getPaymentTypeService = async (sessionId: string) => {

    const { user: userFR } = await handleGetSession({ sessionId });
    if (!userFR) {
        throw new Error('Sesion terminada');
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await getGlobalPool(connection);
    const result = await pool.query(utilsQuery.getPaymentType);
    const typePayments = result.rows;

    return typePayments;
}

const getClientsService = async (sessionId: string, page: string, limit: string) => {

    const { user: userFR } = await handleGetSession({ sessionId });
    if (!userFR) {
        throw new Error('Sesion terminada');
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await getGlobalPool(connection);
    const result = await pool.query(utilsQuery.getClients, [page, limit]);
    const clients = result.rows;

    return clients;

};

const getAddressDirectionService = async (sessionId: string, idpvtadomi: string) => {

    const { user: userFR } = await handleGetSession({ sessionId });
    if (!userFR) {
        throw new Error('Sesion terminada');
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await getGlobalPool(connection);
    const result = await pool.query(utilsQuery.getAddressDirection, [idpvtadomi]);
    const address = result.rows[0];

    return address;
};

const getModulesService = async (idusrmob: number) => {
    const pool: Pool = await dbConnectionInitial();
    try {
        const result = await pool.query(utilsQuery.getModules, [idusrmob]);
        return result.rows;
    } catch (error) {
        throw error;
    } finally {
        await pool.end();
    }
}


export {
    getPaymentTypeService,
    getClientsService,
    getAddressDirectionService,
    getModulesService
}
