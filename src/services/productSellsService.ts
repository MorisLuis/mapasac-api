import { productSellsQuerys } from '../querys/productSellsQuery';
import { dbConnection } from '../database/connection';
import type { UserSessionInterface } from '../interface/user';
import { ValidationError } from '../errors/CustomError';
import type { UnitsInterface } from '../interface/other';
import type { ProductSellsInterface } from '../interface/invearts';
import { Buffer } from 'buffer';
import type ClassInterface from '../interface/class';


const getProductsSellsService = async (
    session: UserSessionInterface,
    page: string,
    limit: string
): Promise<{ products: ProductSellsInterface[] }> => {

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

    const result = await pool.query(productSellsQuerys.getProductsSells, [page, limit]);
    const products = result.rows.map((product: ProductSellsInterface) => {
        if (product.imagen) {
            product.imagen = Buffer.from(product.imagen, 'base64').toString();
        }
        return product;
    });

    const response: { products: ProductSellsInterface[] } = { products }
    return response;
};

const getProductsSellsFromFamilyService = async (
    session: UserSessionInterface,
    cvefamilia: string
): Promise<{ classes: ClassInterface[] }> => {

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

    const result = await pool.query(productSellsQuerys.getProductsSellsFromFamily, [cvefamilia]);
    const classes = result.rows;
    const response: { classes: ClassInterface[] } = { classes }
    return response;

};

const getProductByEnlacemobService = async (
    session: UserSessionInterface,
    idinvearts: string,
    idinveclas: string,
    capa: string
): Promise<{ products: ProductSellsInterface }> => {

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

    const result = await pool.query(productSellsQuerys.getProductByEnlacemob, [idinvearts, idinveclas, capa]);
    const products = result.rows[0];

    const response: { products: ProductSellsInterface } = { products }
    return response;

};

const getUnitsService = async (
    session: UserSessionInterface
): Promise<{ units: UnitsInterface[] }> => {

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
    const result = await pool.query(productSellsQuerys.getUnits);
    const units = result.rows;

    const response: { units: UnitsInterface[] } = { units }
    return response;
};

const getTotalProductsSellsService = async (
    session: UserSessionInterface
): Promise<{ total: number }> => {

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
    const result = await pool.query(productSellsQuerys.getTotalProductsSells);
    const total = result.rows[0].total;
    const response: { total: number } = { total };
    return response;
};

const getTotalClassesSellsService = async (
    session: UserSessionInterface,
    cvefamilia: string
): Promise<{ total: number }> => {

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
    const result = await pool.query(productSellsQuerys.getTotalClassesSells, [cvefamilia]);
    const total = result.rows[0].count;
    const response: { total: number } = { total };
    return response;
};

const getIdinveartsProductService = async (
    session: UserSessionInterface,
    cvefamilia: string
): Promise<{ idinvearts: number }> => {

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
    const result = await pool.query(productSellsQuerys.getIdinveartsProduct, [cvefamilia]);
    const idinvearts = result.rows[0];
    const response: { idinvearts: number } = idinvearts
    return response;
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