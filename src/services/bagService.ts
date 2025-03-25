import { dbConnection } from "../database/connection";
import { EnlacemobInterface } from "../interface/enlacemob";
import { bagQuerys } from "../querys/bagQuerys";
import { handleGetSession } from "../utils/Redis/getSession";


const getBagService = async (sessionId: string, option: string, page: string, limit: string) => {

    const { user: userFR } = await handleGetSession({ sessionId });
    if (!userFR) throw new Error('Sesión terminada');


    const { idusrmob, svr, dba, pasdba, usrdba, port } = userFR;

    const config = {
        user: usrdba,
        database: dba,
        password: pasdba,
        port: port,
        host: svr
    };

    const pool = await dbConnection(config);
    const result = await pool.query(bagQuerys.getBag, [option, idusrmob, page, limit]);
    const bag = result.rows;
    return bag;
};

const getTotalProductsInBagService = async (sessionId: string, option: string) => {

    const { user: userFR } = await handleGetSession({ sessionId });
    if (!userFR) {
        throw new Error('Sesion terminada');
    }

    const { idusrmob, svr, dba, pasdba, usrdba, port } = userFR;

    const config = {
        user: usrdba,
        database: dba,
        password: pasdba,
        port: port,
        host: svr
    };

    const pool = await dbConnection(config);
    const result = await pool.query(bagQuerys.getTotalProductsInBag, [option, idusrmob]);
    const totalproducts = result.rows[0].count;

    return totalproducts;
};

const getTotalPriceBagService = async (sessionId: string, option: string) => {

    const { user: userFR } = await handleGetSession({ sessionId });
    if (!userFR) {
        throw new Error('Sesion terminada');
    }

    const { idusrmob, svr, dba, pasdba, usrdba, port } = userFR;

    const config = {
        user: usrdba,
        database: dba,
        password: pasdba,
        port: port,
        host: svr
    };

    const pool = await dbConnection(config);
    const result = await pool.query(bagQuerys.getTotalPriceBag, [option, idusrmob]);
    const totalproducts = result.rows[0].total;

    return totalproducts;
};

const insertProductToBagService = async (sessionId: string, productData: EnlacemobInterface ) => {
    // Obtener sesión desde Redis
    const { user: userFR } = await handleGetSession({ sessionId });

    if (!userFR) {
        throw new Error('Sesion terminada');
    }

    const { idusrmob, svr, dba, pasdba, usrdba, port } = userFR;

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
        throw new Error('No se pudo establecer la conexión con la base de datos');
    }

    try {
        const { idinvearts, codbarras, unidad, cantidad, precio, opcion, capa, idinveclas, comentario } = productData;

        // Definir cuerpo del producto según la opción
        const productBodySell = [
            idinvearts,
            unidad,
            cantidad,
            precio,
            idusrmob,
            opcion,
            codbarras !== undefined ? codbarras : '',
            idinveclas !== undefined ? idinveclas : 0,
            capa !== undefined ? capa : '',
            comentario !== undefined ? (comentario ?? "").toUpperCase() : ''
        ];

        // Iniciar transacción
        await client.query('BEGIN');
        await client.query(bagQuerys.addProductSellToBag, productBodySell);

        // Confirmar transacción
        await client.query('COMMIT');

        return { message: 'Datos insertados exitosamente' };
    } catch (error) {
        // Si algo falla, revertir los cambios
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

type producToEdit = {
    idenlacemob: number,
    cantidad: number,
    comentarios?: string
}

const updateProductInBagService = async (sessionId: string, product: producToEdit) => {
    const { user: userFR } = await handleGetSession({ sessionId });
    if (!userFR) {
        throw new Error('Sesion terminada');
    }

    const { cantidad, idenlacemob, comentarios } = product;

    // Convertir 'cantidad' a número si no es undefined o vacío
    const cantidadNumerica = cantidad ? Number(cantidad) : undefined;
    const { svr, dba, pasdba, usrdba, port } = userFR;

    const config = {
        user: usrdba,
        database: dba,
        password: pasdba,
        port: port,
        host: svr
    };

    const pool = await dbConnection(config);
    const client = await pool.connect();

    try {
        await client.query('BEGIN');
        // Ejecutar la actualización en la base de datos
        await client.query(bagQuerys.updateProductFromBag, [cantidadNumerica, (comentarios ?? '').toUpperCase(), idenlacemob]);

        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        throw new Error('No se pudo actualizar el producto en la bolsa: ' + error);
    } finally {
        client.release();
    }
};


const deleteProductFromBagService = async (sessionId: string, idenlacemob: string) => {

    const { user: userFR } = await handleGetSession({ sessionId });
    if (!userFR) {
        throw new Error('Sesion terminada');
    };
    const { svr, dba, pasdba, usrdba, port } = userFR;

    const config = {
        user: usrdba,
        database: dba,
        password: pasdba,
        port: port,
        host: svr
    };

    const pool = await dbConnection(config);
    const client = await pool.connect();

    try {
        await client.query('BEGIN');
        await client.query(bagQuerys.deleteProductFromBag, [idenlacemob]);
        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        throw new Error('Error eliminando producto de la bolsa: ' + error);
    } finally {
        client.release();
    };

};

const deleteAllProductsInBagService = async (sessionId: string, opcion: string) => {

    // Obtener sesión desde Redis
    const { user: userFR } = await handleGetSession({ sessionId });
    if (!userFR) {
        throw new Error('Sesion terminada');
    };
    const { idusrmob, svr, dba, pasdba, usrdba, port } = userFR;

    const config = {
        user: usrdba,
        database: dba,
        password: pasdba,
        port: port,
        host: svr
    };

    const pool = await dbConnection(config);
    const client = await pool.connect();

    try {
        await client.query('BEGIN');
        await client.query(bagQuerys.deleteAllProductsInBag, [idusrmob, opcion]);
        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        throw new Error('Error eliminando todos los productos de la bolsa: ' + error);
    } finally {
        client.release();
    }
};


export {
    getBagService,
    getTotalProductsInBagService,
    getTotalPriceBagService,
    insertProductToBagService,
    updateProductInBagService,
    deleteProductFromBagService,
    deleteAllProductsInBagService
}