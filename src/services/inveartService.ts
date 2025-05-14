import moment from 'moment';
import { querys } from '../querys/querys';
import { inveartsQuerys } from '../querys/inveartsQuery';
import { dbConnection } from '../database/connection';
import type { UserSessionInterface } from '../interface/user';
import type { opcionBag } from '../interface/bag';
import { AppError, ValidationError } from '../errors/CustomError';
import type { BaseSaleBody } from '../interface/enlacemob';

const postInventoryService = async (
    session: UserSessionInterface
): Promise<{ message: string, folio: string }> => {

    const { idusrmob, svr, dba, pasdba, usrdba, port } = session;

    const config = {
        user: usrdba,
        database: dba,
        password: pasdba,
        port: port,
        host: svr
    };

    const pool = await dbConnection(config);
    const client = await pool.connect();

    if (!client) {
        throw new ValidationError('No se pudo establecer la conexión con la base de datos');
    }

    try {
        const folioDate = moment().format('YYYY-MM-DD');
        const folioQuery = querys.getFolio;
        const folioValue = await pool.query(folioQuery, [folioDate]);
        const folio = folioValue.rows[0].fn_pedidos_foliounico;

        await client.query('BEGIN');
        await client.query(inveartsQuerys.createInventory, [idusrmob, folio]);
        await client.query('COMMIT');

        return { message: 'Datos insertados exitosamente', folio: folio };
    } catch (error) {
        await client.query('ROLLBACK');
        throw new AppError(`Error al publicar inventario: ${error}`);
    } finally {
        client.release();
    }
};

const postSellService = async (
    session: UserSessionInterface,
    body: BaseSaleBody,
    opcion: opcionBag
): Promise<{ message: string, folio: string }> => {

    const { clavepago, idclientes, comments, domicilio, idviaenvio } = body;
    const { idusrmob, svr, dba, pasdba, usrdba, port } = session;

    const config = {
        user: usrdba,
        database: dba,
        password: pasdba,
        port: port,
        host: svr
    };

    const pool = await dbConnection(config);
    const client = await pool.connect();

    if (!client) {
        throw new ValidationError('No se pudo establecer la conexión con la base de datos');
    }

    try {
        const folioDate = moment().format('YYYY-MM-DD');

        const folioQuery = querys.getFolio;
        const folioValue = await pool.query(folioQuery, [folioDate])
        const folio = folioValue.rows[0].fn_pedidos_foliounico;
        const optionDestination = opcion + 1;


        await client.query('BEGIN');
        await client.query(inveartsQuerys.createSaleTest, [
            optionDestination,
            folio,
            (comments ?? "").toUpperCase(), // Convierte domicilio a mayúsculas
            (domicilio ?? "").toUpperCase(), // Convierte domicilio a mayúsculas
            idviaenvio,
            clavepago,
            idclientes,
            opcion,
            idusrmob
        ]);
        await client.query('COMMIT');
        return { message: 'Datos insertados exitosamente', folio: folio };
    } catch (error) {
        await client.query('ROLLBACK');
        throw new AppError(`Error al publicar venta: ${error}`);
    } finally {
        client.release();
    }
}

export {
    postInventoryService,
    postSellService
}