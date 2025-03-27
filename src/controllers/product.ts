import { NextFunction, Request, Response } from "express";
import { getProducByCodebarService, getProductByClaveService, getProductByIdService, getProductByNoArticuloService, getProductsService, getTotalProductsService, updateProductCodebarService, updateProductService } from "../services/productService";
import { getProducByCodebarQuerySchema, getProductByClaveQuerySchema, getProductByIdQuerySchema, getProductByNoArticuloQuerySchema, getProductsQuerySchema, inveArtsBodySchema, inveArtsParamsSchema, updateProductCodebarBodySchema } from "../validations/productValidations";

// Module 1 - Inventory
const getProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {
        const session = req.session;
        const { limit, page } = getProductsQuerySchema.parse(req.query);
        const { products } = await getProductsService({ session, page, limit })

        res.json({
            total: products.length,
            products
        })

    } catch (error) {
        return next(error);
    }
}

const getTotalProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {


    try {
        const session = req.session;
        const { total } = await getTotalProductsService({ session })
        res.json({
            total
        });
    } catch (error) {
        return next(error);
    }
};

const getProductByClave = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const session = req.session;
        const { clave } = getProductByClaveQuerySchema.parse(req.query);
        const { product } = await getProductByClaveService({ session, clave })
        res.json({ product })
    } catch (error) {
        return next(error);
    }
}

const getProductById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {
        const session = req.session;
        const { idinvearts } = getProductByIdQuerySchema.parse(req.query);
        const { product } = await getProductByIdService({ session, idinvearts })
        res.json({ product })

    } catch (error) {
        return next(error);
    }
}

const getProducByCodebar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {
        const session = req.session;
        const { codbarras } = getProducByCodebarQuerySchema.parse(req.query);
        const { product } = await getProducByCodebarService({ session, codbarras })
        res.json({ product });
    } catch (error) {
        return next(error);
    }
}

const getProductByNoArticulo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {
        const session = req.session;
        const { noarticulo } = getProductByNoArticuloQuerySchema.parse(req.query);
        const { product } = await getProductByNoArticuloService({ session, noarticulo })
        res.json({ product })
    } catch (error) {
        return next(error);
    }
}

const updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {
        const session = req.session;
        const updateFields = inveArtsBodySchema.parse(req.body);
        const { idinvearts } = inveArtsParamsSchema.parse(req.params);
        const { message } = await updateProductService({ session, idinvearts, updateFields })
        res.json({ success: true, message });

    } catch (error) {
        next(error)
    }
};

const updateProductCodebar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {
        const session = req.session;
        const { codbarras } = updateProductCodebarBodySchema.parse(req.body);
        const { idinvearts } = inveArtsParamsSchema.parse(req.params);
        const { message } = await updateProductCodebarService({ session, idinvearts, codbarras })
        res.json({ success: true, message });

    } catch (error) {
        return next(error);
    }
}


export {
    // Module 1 - Inventory
    getProducts,
    getTotalProducts,
    getProductByClave,
    getProductByNoArticulo,
    getProductById,
    getProducByCodebar,
    updateProduct,
    updateProductCodebar
}