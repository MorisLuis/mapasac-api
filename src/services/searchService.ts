import { getGlobalPool } from "../database/connection";
import { searchQuerys } from "../querys/searchQuery";
import { handleGetSession } from "../utils/Redis/getSession";


const searchProductService = async (sessionId: string, searchTerm: string) => {

    const { user: userFR } = await handleGetSession({ sessionId });
    if (!userFR) {
        throw new Error('Sesion terminada');
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await getGlobalPool(connection);
    const result = await pool.query(searchQuerys.searchProduct, [searchTerm]);
    const products = result.rows;

    return products;
};

const searchProductInBagService = async (sessionId: string, searchTerm: string, opcion: string) => {

    const { user: userFR } = await handleGetSession({ sessionId });
    if (!userFR) {
        throw new Error('Sesion terminada');
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await getGlobalPool(connection);
    const result = await pool.query(
        opcion === '2' ? searchQuerys.searchProductInBagSells : searchQuerys.searchProductInBag,
        [opcion, idusrmob, searchTerm]
    );
    const products = result.rows;

    return products;
};

const searchClientsService = async (sessionId: string, searchTerm: string) => {

    const { user: userFR } = await handleGetSession({ sessionId });
    if (!userFR) {
        throw new Error('Sesion terminada');
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await getGlobalPool(connection);

    const result = await pool.query(searchQuerys.searchClients, [searchTerm]);
    const clients = result.rows;

    return clients;

}

export {
    searchProductService,
    searchProductInBagService,
    searchClientsService
}