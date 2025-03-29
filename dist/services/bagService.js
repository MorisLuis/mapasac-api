"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllProductsInBagService = exports.deleteProductFromBagService = exports.updateProductInBagService = exports.insertProductToBagService = exports.getTotalPriceBagService = exports.getTotalProductsInBagService = exports.getBagService = void 0;
const connection_1 = require("../database/connection");
const CustomError_1 = require("../errors/CustomError");
const bagQuerys_1 = require("../querys/bagQuerys");
const getBagService = async (session, option, page, limit) => {
    const { idusrmob, svr, dba, pasdba, usrdba, port } = session;
    const config = {
        user: usrdba,
        database: dba,
        password: pasdba,
        port: port,
        host: svr
    };
    const pool = await (0, connection_1.dbConnection)(config);
    if (!pool) {
        throw new CustomError_1.ValidationError('No se pudo establecer la conexión con la base de datos');
    }
    const result = await pool.query(bagQuerys_1.bagQuerys.getBag, [option, idusrmob, page, limit]);
    const bag = result.rows;
    const response = { bag };
    return response;
};
exports.getBagService = getBagService;
const getTotalProductsInBagService = async (session, option) => {
    const { idusrmob, svr, dba, pasdba, usrdba, port } = session;
    const config = {
        user: usrdba,
        database: dba,
        password: pasdba,
        port: port,
        host: svr
    };
    const pool = await (0, connection_1.dbConnection)(config);
    if (!pool) {
        throw new CustomError_1.ValidationError('No se pudo establecer la conexión con la base de datos');
    }
    ;
    const result = await pool.query(bagQuerys_1.bagQuerys.getTotalProductsInBag, [option, idusrmob]);
    const totalproducts = result.rows[0].count;
    const response = { totalproducts };
    return response;
};
exports.getTotalProductsInBagService = getTotalProductsInBagService;
const getTotalPriceBagService = async (session, option) => {
    const { idusrmob, svr, dba, pasdba, usrdba, port } = session;
    const config = {
        user: usrdba,
        database: dba,
        password: pasdba,
        port: port,
        host: svr
    };
    const pool = await (0, connection_1.dbConnection)(config);
    if (!pool) {
        throw new CustomError_1.ValidationError('No se pudo establecer la conexión con la base de datos');
    }
    ;
    const result = await pool.query(bagQuerys_1.bagQuerys.getTotalPriceBag, [option, idusrmob]);
    const totalPrice = result.rows[0].total;
    const response = { totalPrice };
    return response;
};
exports.getTotalPriceBagService = getTotalPriceBagService;
const insertProductToBagService = async (session, productData) => {
    const { idusrmob, svr, dba, pasdba, usrdba, port } = session;
    const config = {
        user: usrdba,
        database: dba,
        password: pasdba,
        port: port,
        host: svr
    };
    const pool = await (0, connection_1.dbConnection)(config);
    const client = await pool.connect();
    if (!client) {
        throw new CustomError_1.ValidationError('No se pudo establecer la conexión con la base de datos');
    }
    try {
        const { idinvearts, codbarras, unidad, cantidad, precio1, opcion, capa, idinveclas, comentario } = productData;
        const productBodySell = [
            idinvearts,
            unidad,
            cantidad,
            precio1,
            idusrmob,
            opcion,
            codbarras ?? '',
            idinveclas ?? 0,
            capa ?? '',
            comentario ? comentario.toUpperCase() : ''
        ];
        // Iniciar transacción
        await client.query('BEGIN');
        await client.query(bagQuerys_1.bagQuerys.addProductSellToBag, productBodySell);
        await client.query('COMMIT');
        // Confirmar transacción
        await client.query('COMMIT');
        return { message: 'Datos insertados exitosamente' };
    }
    catch (error) {
        // Si algo falla, revertir los cambios
        await client.query('ROLLBACK');
        throw new CustomError_1.AppError('No se pudo agregar el producto: ' + error);
    }
    finally {
        client.release();
    }
};
exports.insertProductToBagService = insertProductToBagService;
const updateProductInBagService = async (session, product) => {
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
    const pool = await (0, connection_1.dbConnection)(config);
    const client = await pool.connect();
    if (!client) {
        throw new CustomError_1.ValidationError('No se pudo establecer la conexión con la base de datos');
    }
    try {
        await client.query('BEGIN');
        // Ejecutar la actualización en la base de datos
        await client.query(bagQuerys_1.bagQuerys.updateProductFromBag, [cantidadNumerica, (comentarios ?? '').toUpperCase(), idenlacemob]);
        await client.query('COMMIT');
        return { message: 'Datos actualizados exitosamente' };
    }
    catch (error) {
        await client.query('ROLLBACK');
        throw new CustomError_1.AppError('No se pudo actualizar el producto en la bolsa: ' + error);
    }
    finally {
        client.release();
    }
};
exports.updateProductInBagService = updateProductInBagService;
const deleteProductFromBagService = async (session, idenlacemob) => {
    const { svr, dba, pasdba, usrdba, port } = session;
    const config = {
        user: usrdba,
        database: dba,
        password: pasdba,
        port: port,
        host: svr
    };
    const pool = await (0, connection_1.dbConnection)(config);
    const client = await pool.connect();
    if (!client) {
        throw new CustomError_1.ValidationError('No se pudo establecer la conexión con la base de datos');
    }
    try {
        await client.query('BEGIN');
        await client.query(bagQuerys_1.bagQuerys.deleteProductFromBag, [idenlacemob]);
        await client.query('COMMIT');
        return { message: 'Datos eliminado exitosamente' };
    }
    catch (error) {
        await client.query('ROLLBACK');
        throw new CustomError_1.AppError('Error eliminando producto de la bolsa: ' + error);
    }
    finally {
        client.release();
    }
    ;
};
exports.deleteProductFromBagService = deleteProductFromBagService;
const deleteAllProductsInBagService = async (session, opcion) => {
    const { idusrmob, svr, dba, pasdba, usrdba, port } = session;
    const config = {
        user: usrdba,
        database: dba,
        password: pasdba,
        port: port,
        host: svr
    };
    const pool = await (0, connection_1.dbConnection)(config);
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        await client.query(bagQuerys_1.bagQuerys.deleteAllProductsInBag, [idusrmob, opcion]);
        await client.query('COMMIT');
        return { message: 'Datoss eliminados exitosamente' };
    }
    catch (error) {
        await client.query('ROLLBACK');
        throw new CustomError_1.AppError('Error eliminando todos los productos de la bolsa: ' + error);
    }
    finally {
        client.release();
    }
};
exports.deleteAllProductsInBagService = deleteAllProductsInBagService;
//# sourceMappingURL=bagService.js.map