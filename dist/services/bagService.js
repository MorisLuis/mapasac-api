"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllProductsInBagService = exports.deleteProductFromBagService = exports.updateProductInBagService = exports.insertProductToBagService = exports.getTotalPriceBagService = exports.getTotalProductsInBagService = exports.getBagService = void 0;
const connection_1 = require("../database/connection");
const bagQuerys_1 = require("../querys/bagQuerys");
const getSession_1 = require("../utils/Redis/getSession");
const getBagService = async (sessionId, option, page, limit) => {
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        throw new Error('Sesion terminada');
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await (0, connection_1.getGlobalPool)(connection);
    /* const result = await pool.query(option === 'sells' ? bagQuerys.getBagSells : bagQuerys.getBag,
        [option, idusrmob, page, limit]
    ); */
    const result = await pool.query(bagQuerys_1.bagQuerys.getBag, [option, idusrmob, page, limit]);
    const bag = result.rows;
    return bag;
};
exports.getBagService = getBagService;
const getTotalProductsInBagService = async (sessionId, option) => {
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        throw new Error('Sesion terminada');
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await (0, connection_1.getGlobalPool)(connection);
    const result = await pool.query(bagQuerys_1.bagQuerys.getTotalProductsInBag, [option, idusrmob]);
    const totalproducts = result.rows[0].count;
    return totalproducts;
};
exports.getTotalProductsInBagService = getTotalProductsInBagService;
const getTotalPriceBagService = async (sessionId, option) => {
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        throw new Error('Sesion terminada');
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await (0, connection_1.getGlobalPool)(connection);
    const result = await pool.query(bagQuerys_1.bagQuerys.getTotalPriceBag, [option, idusrmob]);
    const totalproducts = result.rows[0].total;
    return totalproducts;
};
exports.getTotalPriceBagService = getTotalPriceBagService;
const insertProductToBagService = async (sessionId, productData) => {
    // Obtener sesión desde Redis
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        throw new Error('Sesion terminada');
    }
    const { idusrmob, ...connection } = userFR;
    const pool = await (0, connection_1.getGlobalPool)(connection);
    const client = await pool.connect();
    if (!client) {
        throw new Error('No se pudo establecer la conexión con la base de datos');
    }
    try {
        const { idinvearts, codbarras, unidad, cantidad, precio1, precio, opcion, capa, idinveclas, comentario } = productData;
        const precioFinal = precio1 !== undefined ? precio1 : precio;
        // Definir cuerpo del producto según la opción
        const productBodySell = [
            idinvearts,
            unidad,
            cantidad,
            precioFinal,
            idusrmob,
            opcion,
            codbarras !== undefined ? codbarras : '',
            idinveclas !== undefined ? idinveclas : 0,
            capa !== undefined ? capa : '',
            comentario !== undefined ? comentario : ''
        ];
        // Iniciar transacción
        await client.query('BEGIN');
        await client.query(bagQuerys_1.bagQuerys.addProductSellToBag, productBodySell);
        // Confirmar transacción
        await client.query('COMMIT');
        return { message: 'Datos insertados exitosamente' };
    }
    catch (error) {
        // Si algo falla, revertir los cambios
        await client.query('ROLLBACK');
        throw error;
    }
    finally {
        client.release();
    }
};
exports.insertProductToBagService = insertProductToBagService;
const updateProductInBagService = async (sessionId, product) => {
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        throw new Error('Sesion terminada');
    }
    const { cantidad, idenlacemob, comentarios } = product;
    console.log({
        cantidad, idenlacemob, comentarios
    });
    // Convertir 'cantidad' a número si no es undefined o vacío
    const cantidadNumerica = cantidad ? Number(cantidad) : undefined;
    const { idusrmob, ...connection } = userFR;
    const pool = await (0, connection_1.getGlobalPool)(connection);
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        console.log({ cantidadNumerica, comentarios, idenlacemob });
        // Ejecutar la actualización en la base de datos
        await client.query(bagQuerys_1.bagQuerys.updateProductFromBag, [cantidadNumerica, comentarios, idenlacemob]);
        await client.query('COMMIT');
    }
    catch (error) {
        await client.query('ROLLBACK');
        throw new Error('No se pudo actualizar el producto en la bolsa: ' + error.message);
    }
    finally {
        client.release();
    }
};
exports.updateProductInBagService = updateProductInBagService;
const deleteProductFromBagService = async (sessionId, idenlacemob) => {
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        throw new Error('Sesion terminada');
    }
    ;
    const { idusrmob, ...connection } = userFR;
    const pool = await (0, connection_1.getGlobalPool)(connection);
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        await client.query(bagQuerys_1.bagQuerys.deleteProductFromBag, [idenlacemob]);
        await client.query('COMMIT');
    }
    catch (error) {
        await client.query('ROLLBACK');
        throw new Error('Error eliminando producto de la bolsa: ' + error.message);
    }
    finally {
        client.release();
    }
    ;
};
exports.deleteProductFromBagService = deleteProductFromBagService;
const deleteAllProductsInBagService = async (sessionId, opcion) => {
    // Obtener sesión desde Redis
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR) {
        throw new Error('Sesion terminada');
    }
    ;
    const { idusrmob, ...connection } = userFR;
    const pool = await (0, connection_1.getGlobalPool)(connection);
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        await client.query(bagQuerys_1.bagQuerys.deleteAllProductsInBag, [idusrmob, opcion]);
        await client.query('COMMIT');
    }
    catch (error) {
        await client.query('ROLLBACK');
        throw new Error('Error eliminando todos los productos de la bolsa: ' + error.message);
    }
    finally {
        client.release();
    }
};
exports.deleteAllProductsInBagService = deleteAllProductsInBagService;
//# sourceMappingURL=bagService.js.map