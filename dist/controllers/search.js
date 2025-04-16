"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchClients = exports.searchProductInBag = exports.searchProduct = void 0;
const searchService_1 = require("../services/searchService");
const searchValidations_1 = require("../validations/searchValidations");
const searchProduct = async (req, res, next) => {
    try {
        const { term, codebarEmpty } = searchValidations_1.searchProductsQuerySchema.parse(req.query);
        console.log({ codebarEmpty });
        const session = req.session;
        const searchTerm = term ? term.toString() : 'a';
        const { products } = await (0, searchService_1.searchProductService)(session, searchTerm, codebarEmpty);
        res.json({ products });
    }
    catch (error) {
        return next(error);
    }
};
exports.searchProduct = searchProduct;
const searchProductInBag = async (req, res, next) => {
    try {
        const session = req.session;
        const { term, opcion } = searchValidations_1.searchProductInBagQuerySchema.parse(req.query);
        const searchTerm = term ? term.toString() : 'a';
        const { products } = await (0, searchService_1.searchProductInBagService)(session, searchTerm, opcion);
        res.json({ products });
    }
    catch (error) {
        return next(error);
    }
    ;
};
exports.searchProductInBag = searchProductInBag;
const searchClients = async (req, res, next) => {
    try {
        const session = req.session;
        const { term } = req.query;
        const searchTerm = term ? term.toString() : 'a';
        const { clients } = await (0, searchService_1.searchClientsService)(session, searchTerm);
        res.json({ clients });
    }
    catch (error) {
        return next(error);
    }
};
exports.searchClients = searchClients;
//# sourceMappingURL=search.js.map