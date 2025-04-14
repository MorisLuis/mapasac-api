import { dbConnection } from "../database/connection";
import { AppError, ValidationError } from "../errors/CustomError";
import type { ProductInterface } from "../interface/invearts";
import type { UserSessionInterface } from "../interface/user";
import { productQuerys } from "../querys/productQuery";
import { identifyBarcodeType } from "../utils/identifyBarcodeType";


interface getProductsServiceInterface {
    session: UserSessionInterface;
    page: number;
    limit: number;
}

const getProductsService = async ({
    session,
    page,
    limit
}: getProductsServiceInterface): Promise<{ products: ProductInterface[] }> => {

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

    const result = await pool.query(productQuerys.getProducts, [page, limit]);
    const products = result.rows;

    const response: { products: ProductInterface[] } = { products }
    return response;
};


const getTotalProductsService = async ({
    session
}: { session: UserSessionInterface }): Promise<{ total: number }> => {

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

    const result = await pool.query(productQuerys.getTotalProducts);
    const total = result.rows[0].count;

    const response: { total: number } = { total }
    return response;
};

interface getProductByClaveServiceInterface {
    session: UserSessionInterface;
    clave: string;
}

const getProductByClaveService = async ({
    session,
    clave
}: getProductByClaveServiceInterface): Promise<{ product: ProductInterface[] }> => {

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

    const result = await pool.query(productQuerys.getProductByClave, [clave]);
    const product = result.rows

    const response: { product: ProductInterface[] } = { product }
    return response;
};

interface getProductByIdServiceInterface {
    session: UserSessionInterface;
    idinvearts: string
}

const getProductByIdService = async ({
    session,
    idinvearts
}: getProductByIdServiceInterface): Promise<{ product: ProductInterface }> => {

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
    const result = await pool.query(productQuerys.getProductById, [idinvearts]);
    const product = result.rows[0]
    const response: { product: ProductInterface } = { product }
    return response
};

interface getProducByCodebarServiceInterface {

    session: UserSessionInterface;
    codbarras: string
}

const getProducByCodebarService = async ({
    session,
    codbarras
}: getProducByCodebarServiceInterface): Promise<{ product: ProductInterface[] }> => {

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

    let codbar = codbarras;
    const identifycodebarType = identifyBarcodeType(codbar)

    if (identifycodebarType === "UPC-A convertido a EAN-13") {
        codbar = codbar?.substring(1)
    }

    const result = await pool.query(productQuerys.getProductByCodebar, [codbar]);
    const product = result.rows

    const response: { product: ProductInterface[] } = { product }
    return response
};


interface getProductByNoArticuloServiceInterface {
    session: UserSessionInterface;
    noarticulo: string
}

const getProductByNoArticuloService = async ({
    session,
    noarticulo
}: getProductByNoArticuloServiceInterface): Promise<{ product: ProductInterface[] }> => {

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

    const result = await pool.query(productQuerys.getProductByNoarticulo, [noarticulo]);
    const product = result.rows

    const response: { product: ProductInterface[] } = { product }
    return response
};

interface updateProductServiceInterface {
    session: UserSessionInterface;
    idinvearts: string;
    updateFields: Partial<ProductInterface>;
}

const updateProductService = async ({
    session,
    idinvearts,
    updateFields
}: updateProductServiceInterface): Promise<{ message: string }> => {

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

    const client = await pool.connect();
    if (!client) {
        throw new ValidationError('No se pudo establecer la conexión con la base de datos');
    }

    if (!idinvearts) {
        throw new ValidationError('El campo idinvearts es requerido')
    }

    try {
        const setClauses = Object.keys(updateFields)
            .map((key, index) => `${key} = $${index + 2}`)
            .join(', ');

        const values = [idinvearts, ...Object.values(updateFields)];
        const query = productQuerys.updateProduct.replace('$SET_CLAUSES', setClauses);

        await client.query('BEGIN');

        await client.query(query, values);

        await client.query('COMMIT');

        return {
            message: 'Producto actualizado correctamente'
        }
    } catch (error) {
        await client.query('ROLLBACK');
        throw new AppError(`Error al actualizar producto: ${error}`);
    } finally {
        client.release();
    }
};

interface updateProductCodebarServiceInterface {
    session: UserSessionInterface;
    idinvearts: string;
    codbarras: string;
}
const updateProductCodebarService = async ({
    session,
    idinvearts,
    codbarras
}: updateProductCodebarServiceInterface): Promise<{ message: string }> => {

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

    const client = await pool.connect();
    if (!client) {
        throw new ValidationError('No se pudo establecer la conexión con la base de datos');
    }

    if (!idinvearts) {
        throw new ValidationError('El campo idinvearts es requerido')
    }

    try {
        let codbar = codbarras

        const identifycodebarType = identifyBarcodeType(codbar)

        if (identifycodebarType === "UPC-A convertido a EAN-13") {
            codbar = codbar?.substring(1)
        }

        await client.query('BEGIN');

        await client.query(productQuerys.updateCodebarProduct, [codbar, idinvearts]);

        await client.query('COMMIT');

        return {
            message: 'Producto actualizado correctamente'
        }
    } catch (error) {
        await client.query('ROLLBACK');
        throw new AppError(`Error al actualizar producto: ${error}`);
    } finally {
        client.release();
    }
}



export {
    getProductsService,
    getTotalProductsService,
    getProductByClaveService,
    getProductByIdService,
    getProducByCodebarService,
    getProductByNoArticuloService,
    updateProductService,
    updateProductCodebarService
}