import { handleGetSession } from '../utils/Redis/getSession';
import { getGlobalPool } from '../database/connection';
import { productSellsRestaurantQuerys } from '../querys/productSellsRestaurantQuery';


const getProductsSellsRestaurantService = async (sessionId: string, page: string, limit: string) => {
    const { user: userFR } = await handleGetSession({ sessionId });

    if (!userFR) {
        throw new Error('Sesion terminada');
    }

    const { idusrmob, ...connection } = userFR;
    const pool = await getGlobalPool(connection);
    const result = await pool.query(productSellsRestaurantQuerys.getProductsSellsRestaurant, [page, limit]);
    const products = result.rows.map((product: any) => {
        if (product.imagen) {
            product.imagen = Buffer.from(product.imagen, 'base64').toString();
        }
        return product;
    });

    return products;
}


const getProductSellsRestaurantDetailsService = async (sessionId: string, cvefamilia: string) => {
    const { user: userFR } = await handleGetSession({ sessionId });

    if (!userFR) {
        throw new Error('Sesion terminada');
    }

    const { idusrmob, ...connection } = userFR;
    const pool = await getGlobalPool(connection);
    const result = await pool.query(productSellsRestaurantQuerys.getProductSellsRestaurantDetails, [cvefamilia]);
    const product = result.rows;
    return product;
};


const getTotalProductsSellsRestaurantService = async (sessionId: string) => {

    const { user: userFR } = await handleGetSession({ sessionId });

    if (!userFR) {
        throw new Error('Sesion terminada');
    }

    const { idusrmob, ...connection } = userFR;
    const pool = await getGlobalPool(connection);
    const result = await pool.query(productSellsRestaurantQuerys.getTotalProductsSellsRestaurant);
    const total = result.rows[0].total;

    return total;
}

export {
    getProductsSellsRestaurantService,
    getProductSellsRestaurantDetailsService,
    getTotalProductsSellsRestaurantService
}