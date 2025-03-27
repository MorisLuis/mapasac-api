import { productSellsRestaurantQuerys } from '../querys/productSellsRestaurantQuery';
import { dbConnection } from '../database/connection';
import { UserSessionInterface } from '../interface/user';
import { ValidationError } from '../errors/CustomError';
import { ProductSellsRestaurantInterface } from '../interface/invearts';
import { Buffer } from 'buffer';

const getProductsSellsRestaurantService = async (
    session: UserSessionInterface,
    page: string,
    limit: string
): Promise<{ products: ProductSellsRestaurantInterface[] }> => {

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

    const result = await pool.query(productSellsRestaurantQuerys.getProductsSellsRestaurant, [page, limit]);
    const products = result.rows.map((product: ProductSellsRestaurantInterface) => {
        if (product.imagen) {
            product.imagen = Buffer.from(product.imagen, 'base64').toString();
        }
        return product;
    });

    const response: { products: ProductSellsRestaurantInterface[] } = { products }
    return response;
}


// PENDING
// we modify const product = result.rows to const product = result.rows[0].
const getProductSellsRestaurantDetailsService = async (
    session: UserSessionInterface,
    cvefamilia: string
): Promise<ProductSellsRestaurantInterface> => {

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

    const result = await pool.query(productSellsRestaurantQuerys.getProductSellsRestaurantDetails, [cvefamilia]);
    const product = result.rows[0];
    return product;
};


const getTotalProductsSellsRestaurantService = async (
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

    const result = await pool.query(productSellsRestaurantQuerys.getTotalProductsSellsRestaurant);
    const total = result.rows[0].total;
    const response: { total: number } = { total };
    return response;
}

export {
    getProductsSellsRestaurantService,
    getProductSellsRestaurantDetailsService,
    getTotalProductsSellsRestaurantService
}