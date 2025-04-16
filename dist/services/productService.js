"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductCodebarService = exports.updateProductService = exports.getProductByNoArticuloService = exports.getProducByCodebarService = exports.getProductByIdService = exports.getProductByClaveService = exports.getTotalProductsService = exports.getProductsService = void 0;
const connection_1 = require("../database/connection");
const CustomError_1 = require("../errors/CustomError");
const productQuery_1 = require("../querys/productQuery");
const identifyBarcodeType_1 = require("../utils/identifyBarcodeType");
const getProductsService = async ({ session, page, limit, codebarEmpty = false }) => {
    const { svr, dba, pasdba, usrdba, port } = session;
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
    let result;
    if (codebarEmpty) {
        result = await pool.query(productQuery_1.productQuerys.getProductsWithoutCodbarrras, [page, limit]);
    }
    else {
        result = await pool.query(productQuery_1.productQuerys.getProducts, [page, limit]);
    }
    const products = result.rows;
    const response = { products };
    return response;
};
exports.getProductsService = getProductsService;
const getTotalProductsService = async ({ session }) => {
    const { svr, dba, pasdba, usrdba, port } = session;
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
    const result = await pool.query(productQuery_1.productQuerys.getTotalProducts);
    const total = result.rows[0].count;
    const response = { total };
    return response;
};
exports.getTotalProductsService = getTotalProductsService;
const getProductByClaveService = async ({ session, clave }) => {
    const { svr, dba, pasdba, usrdba, port } = session;
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
    const result = await pool.query(productQuery_1.productQuerys.getProductByClave, [clave]);
    const product = result.rows;
    const response = { product };
    return response;
};
exports.getProductByClaveService = getProductByClaveService;
const getProductByIdService = async ({ session, idinvearts }) => {
    const { svr, dba, pasdba, usrdba, port } = session;
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
    const result = await pool.query(productQuery_1.productQuerys.getProductById, [idinvearts]);
    const product = result.rows[0];
    const response = { product };
    return response;
};
exports.getProductByIdService = getProductByIdService;
const getProducByCodebarService = async ({ session, codbarras }) => {
    const { svr, dba, pasdba, usrdba, port } = session;
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
    let codbar = codbarras;
    const identifycodebarType = (0, identifyBarcodeType_1.identifyBarcodeType)(codbar);
    if (identifycodebarType === "UPC-A convertido a EAN-13") {
        codbar = codbar?.substring(1);
    }
    const result = await pool.query(productQuery_1.productQuerys.getProductByCodebar, [codbar]);
    const product = result.rows;
    const response = { product };
    return response;
};
exports.getProducByCodebarService = getProducByCodebarService;
const getProductByNoArticuloService = async ({ session, noarticulo }) => {
    const { svr, dba, pasdba, usrdba, port } = session;
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
    const result = await pool.query(productQuery_1.productQuerys.getProductByNoarticulo, [noarticulo]);
    const product = result.rows;
    const response = { product };
    return response;
};
exports.getProductByNoArticuloService = getProductByNoArticuloService;
const updateProductService = async ({ session, idinvearts, updateFields }) => {
    const { svr, dba, pasdba, usrdba, port } = session;
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
    const client = await pool.connect();
    if (!client) {
        throw new CustomError_1.ValidationError('No se pudo establecer la conexión con la base de datos');
    }
    if (!idinvearts) {
        throw new CustomError_1.ValidationError('El campo idinvearts es requerido');
    }
    try {
        console.log({ updateFields });
        const setClauses = Object.keys(updateFields)
            .map((key, index) => {
            const dbKey = key === 'precio' ? 'precio1' : key;
            return `${dbKey} = $${index + 2}`;
        })
            .join(', ');
        const values = [idinvearts, ...Object.values(updateFields)];
        const query = productQuery_1.productQuerys.updateProduct.replace('$SET_CLAUSES', setClauses);
        await client.query('BEGIN');
        await client.query(query, values);
        await client.query('COMMIT');
        return {
            message: 'Producto actualizado correctamente'
        };
    }
    catch (error) {
        await client.query('ROLLBACK');
        throw new CustomError_1.AppError(`Error al actualizar producto: ${error}`);
    }
    finally {
        client.release();
    }
};
exports.updateProductService = updateProductService;
const updateProductCodebarService = async ({ session, idinvearts, codbarras }) => {
    const { svr, dba, pasdba, usrdba, port } = session;
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
    const client = await pool.connect();
    if (!client) {
        throw new CustomError_1.ValidationError('No se pudo establecer la conexión con la base de datos');
    }
    if (!idinvearts) {
        throw new CustomError_1.ValidationError('El campo idinvearts es requerido');
    }
    try {
        let codbar = codbarras;
        const identifycodebarType = (0, identifyBarcodeType_1.identifyBarcodeType)(codbar);
        if (identifycodebarType === "UPC-A convertido a EAN-13") {
            codbar = codbar?.substring(1);
        }
        await client.query('BEGIN');
        await client.query(productQuery_1.productQuerys.updateCodebarProduct, [codbar, idinvearts]);
        await client.query('COMMIT');
        return {
            message: 'Producto actualizado correctamente'
        };
    }
    catch (error) {
        await client.query('ROLLBACK');
        throw new CustomError_1.AppError(`Error al actualizar producto: ${error}`);
    }
    finally {
        client.release();
    }
};
exports.updateProductCodebarService = updateProductCodebarService;
//# sourceMappingURL=productService.js.map