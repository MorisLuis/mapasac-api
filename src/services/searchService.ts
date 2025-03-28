import { dbConnection } from "../database/connection";
import { ValidationError } from "../errors/CustomError";
import { ProductInterface } from "../interface/invearts";
import { ClientInterface } from "../interface/other";
import { UserSessionInterface } from "../interface/user";
import { searchQuerys } from "../querys/searchQuery";


const searchProductService = async (
    session: UserSessionInterface,
    searchTerm: string
): Promise<{ products: ProductInterface[] }> => {

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
    }

    const result = await pool.query(searchQuerys.searchProduct, [searchTerm]);
    const products = result.rows;

    const response: { products: ProductInterface[] } = { products }
    return response;
};

const searchProductInBagService = async (
    session: UserSessionInterface,
    searchTerm: string,
    opcion: 0 | 2 | 4
): Promise<{ products: ProductInterface[] }> => {


    const { svr, dba, pasdba, usrdba, port, idusrmob } = session;

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
    const result = await pool.query(
        opcion === 2 ? searchQuerys.searchProductInBagSells : searchQuerys.searchProductInBag,
        [opcion, idusrmob, searchTerm]
    );

    const products = result.rows;
    const response: { products: ProductInterface[] } = { products }

    return response;
};

const searchClientsService = async (
    session: UserSessionInterface,
    searchTerm: string
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

    const result = await pool.query(searchQuerys.searchClients, [searchTerm]);
    const clients = result.rows;
    const response: { clients: ClientInterface[] } = { clients }
    return response;

}

export {
    searchProductService,
    searchProductInBagService,
    searchClientsService
}