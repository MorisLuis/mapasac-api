import type { Pool } from "pg";
import { dbConnection, dbConnectionInitial } from "../database/connection";
import { utilsQuery } from "../querys/utilsQuery";
import type { UserSessionInterface } from "../interface/user";
import type { AddressInterface, ClientInterface, ModuleInterface, TypePaymentsInterface } from "../interface/other";
import { AppError, ValidationError } from "../errors/CustomError";

const getPaymentTypeService = async (
    session: UserSessionInterface
): Promise<{ typePayments: TypePaymentsInterface[] }> => {


    const { svr, dba, pasdba, usrdba, port } = session;

    const config = {
        user: usrdba,
        database: dba,
        password: pasdba,
        port: port,
        host: svr
    };

    const pool = await dbConnection(config);
    if (!pool) {
        throw new ValidationError('No se pudo establecer la conexión con la base de datos');
    };

    const result = await pool.query(utilsQuery.getPaymentType);
    const typePayments = result.rows;
    const response: { typePayments: TypePaymentsInterface[] } = { typePayments }
    return response;
}

const getClientsService = async (
    session: UserSessionInterface,
    page: string,
    limit: string
): Promise<{ clients: ClientInterface[] }> => {

    const { svr, dba, pasdba, usrdba, port } = session;

    const config = {
        user: usrdba,
        database: dba,
        password: pasdba,
        port: port,
        host: svr
    };

    const pool = await dbConnection(config);
    if (!pool) {
        throw new ValidationError('No se pudo establecer la conexión con la base de datos');
    };
    const result = await pool.query(utilsQuery.getClients, [page, limit]);
    const clients = result.rows;

    const response: { clients: ClientInterface[] } = { clients }
    return response;
};

const getAddressDirectionService = async (
    session: UserSessionInterface,
    idpvtadomi: string
): Promise<{ address: AddressInterface[] }> => {

    const { svr, dba, pasdba, usrdba, port } = session;

    const config = {
        user: usrdba,
        database: dba,
        password: pasdba,
        port: port,
        host: svr
    };

    const pool = await dbConnection(config);
    if (!pool) {
        throw new ValidationError('No se pudo establecer la conexión con la base de datos');
    };
    const result = await pool.query(utilsQuery.getAddressDirection, [idpvtadomi]);
    const address = result.rows[0];

    const response: { address: AddressInterface[] } = { address }
    return response;
};

const getModulesService = async (
    session: UserSessionInterface
): Promise<{ modules: ModuleInterface[] }> => {

    const { idusrmob } = session;
    const pool: Pool = await dbConnectionInitial();
    if (!pool) {
        throw new ValidationError('No se pudo establecer la conexión con la base de datos');
    };

    try {
        const result = await pool.query(utilsQuery.getModules, [idusrmob]);
        const modules = result.rows;
        const response: { modules: ModuleInterface[] } = { modules }
        return response;
    } catch (error) {
        throw new AppError(`${error}`);
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
