import moment from 'moment';
import { querys } from '../querys/querys';
import { getGlobalPool } from '../database/connection';
import { handleGetSession } from '../utils/Redis/getSession';
import { inveartsQuerys } from '../querys/inveartsQuery';

const postInventoryService = async (sessionId: string) => {

    const { user: userFR } = await handleGetSession({ sessionId });
    if (!userFR) {
        throw new Error('Sesion terminada');
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await getGlobalPool(connection);
    const client = await pool.connect();
    if (!client) {
        throw new Error('No se pudo establecer la conexión con la base de datos');
    }

    try {
        const folioDate = moment().format('YYYY-MM-DD');
        const folioQuery = querys.getFolio;
        const folioValue = await pool.query(folioQuery, [folioDate]);
        const folio = folioValue.rows[0].fn_pedidos_foliounico;

        await client.query('BEGIN');
        await client.query(inveartsQuerys.createInventory, [idusrmob, folio]);
        await client.query('COMMIT');

        return { message: 'Datos insertados exitosamente' };
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};


const postSellService = async (sessionId: string, body: any, opcion: string) => {

    const { user: userFR } = await handleGetSession({ sessionId });
    const { clavepago, idclientes, comments, domicilio, idviaenvio } = body;

    if (!userFR) {
        throw new Error('Sesion terminada');
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await getGlobalPool(connection);
    const client = await pool.connect();
    if (!client) {
        throw new Error('No se pudo establecer la conexión con la base de datos');
    }

    try {
        const folioDate = moment().format('YYYY-MM-DD');
        const folioQuery = querys.getFolio;
        const folioValue = await pool.query(folioQuery, [folioDate])
        const folio = folioValue.rows[0].fn_pedidos_foliounico;
        const optionDestination = Number(opcion) + 1;


        await client.query('BEGIN');
        await client.query(inveartsQuerys.createSaleTest, [
            optionDestination,
            folio,
            (comments ?? "").toUpperCase(), // Convierte domicilio a mayúsculas
            (domicilio ?? "").toUpperCase(), // Convierte domicilio a mayúsculas
            idviaenvio ?? 0,
            clavepago ?? 0,
            idclientes ?? 0,
            opcion,
            idusrmob
        ]);
        await client.query('COMMIT');

        return { message: 'Datos insertados exitosamente' };
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}

export {
    postInventoryService,
    postSellService
}