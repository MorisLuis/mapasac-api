import { handleGetSession } from '../utils/Redis/getSession';
import { productSellsQuerys } from '../querys/productSellsQuery';
import { dbConnection } from '../database/connection';


const getProductsSellsService = async (sessionId: string, page: string, limit: string) => {

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
    const result = await pool.query(productSellsQuerys.getProductsSells, [page, limit]);
    const products = result.rows.map((product: any) => {
        if (product.imagen) {
            product.imagen = Buffer.from(product.imagen, 'base64').toString();
        }
        return product;
    });

    return products;

};

const getProductsSellsFromFamilyService = async (sessionId: string, cvefamilia: string) => {

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
    const result = await pool.query(productSellsQuerys.getProductsSellsFromFamily, [cvefamilia]);

    return result.rows;

};

const getProductByEnlacemobService = async (sessionId: string, idinvearts: string, idinveclas: string, capa: string) => {

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
    const result = await pool.query(productSellsQuerys.getProductByEnlacemob, [idinvearts, idinveclas, capa]);
    const product = result.rows[0];

    return product;

};

const getUnitsService = async (sessionId: string) => {

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
    const result = await pool.query(productSellsQuerys.getUnits);
    const units = result.rows;

    return units;
};

const getTotalProductsSellsService = async (sessionId: string) => {

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
    const result = await pool.query(productSellsQuerys.getTotalProductsSells);
    const total = result.rows[0].total;

    return total;
};

const getTotalClassesSellsService = async (sessionId: string, cvefamilia: string) => {

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
    const result = await pool.query(productSellsQuerys.getTotalClassesSells, [cvefamilia]);
    const total = result.rows[0].count;

    return total;
};

const getIdinveartsProductService = async (sessionId: string, cvefamilia: string) => {

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
    const result = await pool.query(productSellsQuerys.getIdinveartsProduct, [cvefamilia]);
    const product = result.rows[0];

    return product;
}


export {
    getProductsSellsService,
    getProductsSellsFromFamilyService,
    getProductByEnlacemobService,
    getUnitsService,
    getTotalProductsSellsService,
    getTotalClassesSellsService,
    getIdinveartsProductService
}