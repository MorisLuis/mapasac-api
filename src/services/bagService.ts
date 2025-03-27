import { dbConnection } from "../database/connection";
import { AppError, ValidationError } from "../errors/CustomError";
import { BagInterface } from "../interface/bag";
import { EnlacemobInterface } from "../interface/enlacemob";
import { UserSessionInterface } from "../interface/user";
import { bagQuerys } from "../querys/bagQuerys";


const getBagService = async (
    session: UserSessionInterface,
    option: string,
    page: string,
    limit: string
): Promise<{ bag: BagInterface[] }> => {

    const { idusrmob, svr, dba, pasdba, usrdba, port } = session;

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

    const result = await pool.query(bagQuerys.getBag, [option, idusrmob, page, limit]);
    const bag = result.rows;

    const response: { bag: BagInterface[] } = { bag };
    return response;
};

const getTotalProductsInBagService = async (
    session: UserSessionInterface,
    option: string
): Promise<{ totalproducts: number }> => {

    const { idusrmob, svr, dba, pasdba, usrdba, port } = session;

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

    const result = await pool.query(bagQuerys.getTotalProductsInBag, [option, idusrmob]);
    const totalproducts = result.rows[0].count;

    const response: { totalproducts: number } = { totalproducts };
    return response;
};

const getTotalPriceBagService = async (
    session: UserSessionInterface,
    option: string
): Promise<{ totalproducts: number }> => {

    const { idusrmob, svr, dba, pasdba, usrdba, port } = session;

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

    const result = await pool.query(bagQuerys.getTotalPriceBag, [option, idusrmob]);
    const totalproducts = result.rows[0].total;

    const response: { totalproducts: number } = { totalproducts };
    return response;
};

const insertProductToBagService = async (
    session: UserSessionInterface,
    productData: EnlacemobInterface
): Promise<{ message: string }> => {

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
        const { idinvearts, codbarras, unidad, cantidad, precio, opcion, capa, idinveclas, comentario } = productData;

        const productBodySell = [
            idinvearts,
            unidad,
            cantidad,
            precio,
            idusrmob,
            opcion,
            codbarras ?? '',
            idinveclas ?? 0,
            capa ?? '',
            comentario ? comentario.toUpperCase() : ''
        ];
        
        // Iniciar transacción
        await client.query('BEGIN');
        await client.query(bagQuerys.addProductSellToBag, productBodySell);
        await client.query('COMMIT');
        
        
        // Iniciar transacción
        await client.query('BEGIN');
        await client.query(bagQuerys.addProductSellToBag, productBodySell);

        // Confirmar transacción
        await client.query('COMMIT');

        return { message: 'Datos insertados exitosamente' };
    } catch (error) {
        // Si algo falla, revertir los cambios
        await client.query('ROLLBACK');
        throw new AppError('No se pudo agregar el producto: ' + error);
    } finally {
        client.release();
    }
};

type producToEdit = {
    idenlacemob: number,
    cantidad: number,
    comentarios?: string
}

const updateProductInBagService = async (
    session: UserSessionInterface,
    product: producToEdit
): Promise<{ message: string }> => {

    const { cantidad, idenlacemob, comentarios } = product;

    // Convertir 'cantidad' a número si no es undefined o vacío
    const cantidadNumerica = cantidad ? Number(cantidad) : undefined;
    const { svr, dba, pasdba, usrdba, port } = session;

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
        await client.query('BEGIN');
        // Ejecutar la actualización en la base de datos
        await client.query(bagQuerys.updateProductFromBag, [cantidadNumerica, (comentarios ?? '').toUpperCase(), idenlacemob]);
        await client.query('COMMIT');
        return { message: 'Datos actualizados exitosamente' };
    } catch (error) {
        await client.query('ROLLBACK');
        throw new AppError('No se pudo actualizar el producto en la bolsa: ' + error);
    } finally {
        client.release();
    }
};


const deleteProductFromBagService = async (
    session: UserSessionInterface,
    idenlacemob: string
): Promise<{ message: string }> => {

    const { svr, dba, pasdba, usrdba, port } = session;

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
        await client.query('BEGIN');
        await client.query(bagQuerys.deleteProductFromBag, [idenlacemob]);
        await client.query('COMMIT');
        return { message: 'Datos eliminado exitosamente' };
    } catch (error) {
        await client.query('ROLLBACK');
        throw new AppError('Error eliminando producto de la bolsa: ' + error);
    } finally {
        client.release();
    };

};

const deleteAllProductsInBagService = async (
    session: UserSessionInterface,
    opcion: string
): Promise<{ message: string }> => {

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

    try {
        await client.query('BEGIN');
        await client.query(bagQuerys.deleteAllProductsInBag, [idusrmob, opcion]);
        await client.query('COMMIT');
        return { message: 'Datoss eliminados exitosamente' };

    } catch (error) {
        await client.query('ROLLBACK');
        throw new AppError('Error eliminando todos los productos de la bolsa: ' + error);
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