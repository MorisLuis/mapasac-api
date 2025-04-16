"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductCodebar = exports.updateProduct = exports.getProducByCodebar = exports.getProductById = exports.getProductByNoArticulo = exports.getProductByClave = exports.getTotalProducts = exports.getProducts = void 0;
const productService_1 = require("../services/productService");
const productValidations_1 = require("../validations/productValidations");
// Module 1 - Inventory
const getProducts = async (req, res, next) => {
    try {
        const session = req.session;
        const { limit, page, codebarEmpty } = productValidations_1.getProductsQuerySchema.parse(req.query);
        const { products } = await (0, productService_1.getProductsService)({ session, page, limit, codebarEmpty });
        res.json({
            total: products.length,
            products
        });
    }
    catch (error) {
        return next(error);
    }
};
exports.getProducts = getProducts;
const getTotalProducts = async (req, res, next) => {
    try {
        const session = req.session;
        const { total } = await (0, productService_1.getTotalProductsService)({ session });
        res.json({
            total
        });
    }
    catch (error) {
        return next(error);
    }
};
exports.getTotalProducts = getTotalProducts;
const getProductByClave = async (req, res, next) => {
    try {
        const session = req.session;
        const { clave } = productValidations_1.getProductByClaveQuerySchema.parse(req.query);
        const { product } = await (0, productService_1.getProductByClaveService)({ session, clave });
        res.json({ product });
    }
    catch (error) {
        return next(error);
    }
};
exports.getProductByClave = getProductByClave;
const getProductById = async (req, res, next) => {
    try {
        const session = req.session;
        const { idinvearts } = productValidations_1.getProductByIdQuerySchema.parse(req.query);
        const { product } = await (0, productService_1.getProductByIdService)({ session, idinvearts });
        res.json({ product });
    }
    catch (error) {
        return next(error);
    }
};
exports.getProductById = getProductById;
const getProducByCodebar = async (req, res, next) => {
    try {
        const session = req.session;
        const { codbarras } = productValidations_1.getProducByCodebarQuerySchema.parse(req.query);
        const { product } = await (0, productService_1.getProducByCodebarService)({ session, codbarras });
        res.json({ product });
    }
    catch (error) {
        return next(error);
    }
};
exports.getProducByCodebar = getProducByCodebar;
const getProductByNoArticulo = async (req, res, next) => {
    try {
        const session = req.session;
        const { noarticulo } = productValidations_1.getProductByNoArticuloQuerySchema.parse(req.query);
        const { product } = await (0, productService_1.getProductByNoArticuloService)({ session, noarticulo });
        res.json({ product });
    }
    catch (error) {
        return next(error);
    }
};
exports.getProductByNoArticulo = getProductByNoArticulo;
const updateProduct = async (req, res, next) => {
    try {
        const session = req.session;
        const updateFields = productValidations_1.inveArtsBodySchema.parse(req.body);
        const { idinvearts } = productValidations_1.inveArtsParamsSchema.parse(req.params);
        const { message } = await (0, productService_1.updateProductService)({ session, idinvearts, updateFields });
        res.json({ success: true, message });
    }
    catch (error) {
        next(error);
    }
};
exports.updateProduct = updateProduct;
const updateProductCodebar = async (req, res, next) => {
    try {
        const session = req.session;
        const { codbarras } = productValidations_1.updateProductCodebarBodySchema.parse(req.body);
        const { idinvearts } = productValidations_1.inveArtsParamsSchema.parse(req.params);
        const { message } = await (0, productService_1.updateProductCodebarService)({ session, idinvearts, codbarras });
        res.json({ success: true, message });
    }
    catch (error) {
        return next(error);
    }
};
exports.updateProductCodebar = updateProductCodebar;
//# sourceMappingURL=product.js.map