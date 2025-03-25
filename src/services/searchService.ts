import { dbConnection } from "../database/connection";
import { searchQuerys } from "../querys/searchQuery";
import { handleGetSession } from "../utils/Redis/getSession";


const searchProductService = async (sessionId: string, searchTerm: string) => {

    const { user: userFR } = await handleGetSession({ sessionId });
    if (!userFR) {
        throw new Error('Sesion terminada');
    }
    const { svr, dba, pasdba, usrdba, port } = userFR;

    const config = {
        user: usrdba,
        database: dba,
        password: pasdba,
        port: port,
        host: svr
    };

    const pool = await dbConnection(config);
    const result = await pool.query(searchQuerys.searchProduct, [searchTerm]);
    const products = result.rows;

    return products;
};

const searchProductInBagService = async (sessionId: string, searchTerm: string, opcion: string) => {

    const { user: userFR } = await handleGetSession({ sessionId });
    if (!userFR) {
        throw new Error('Sesion terminada');
    }
    const { svr, dba, pasdba, usrdba, port } = userFR;

    const config = {
        user: usrdba,
        database: dba,
        password: pasdba,
        port: port,
        host: svr
    };

    const pool = await dbConnection(config);
    const result = await pool.query(
        opcion === '2' ? searchQuerys.searchProductInBagSells : searchQuerys.searchProductInBag,
        [opcion, searchTerm]
    );
    const products = result.rows;

    return products;
};

const searchClientsService = async (sessionId: string, searchTerm: string) => {

    const { user: userFR } = await handleGetSession({ sessionId });
    if (!userFR) {
        throw new Error('Sesion terminada');
    }
    const { svr, dba, pasdba, usrdba, port } = userFR;

    const config = {
        user: usrdba,
        database: dba,
        password: pasdba,
        port: port,
        host: svr
    };

    const pool = await dbConnection(config);

    const result = await pool.query(searchQuerys.searchClients, [searchTerm]);
    const clients = result.rows;

    return clients;

}

export {
    searchProductService,
    searchProductInBagService,
    searchClientsService
}