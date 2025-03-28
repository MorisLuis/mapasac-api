"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSellQuery = exports.postSellBodySchema = exports.getProductsSellsFromFamilyQuerySchema = exports.getProductByEnlacemobQuerySchema = exports.getProductsSellsQuerySchema = void 0;
const zod_1 = require("zod");
exports.getProductsSellsQuerySchema = zod_1.z.object({
    page: zod_1.z.string().min(1, "page es requerido"),
    limit: zod_1.z.string().min(1, "limit es requerido"),
});
exports.getProductByEnlacemobQuerySchema = zod_1.z.object({
    idinvearts: zod_1.z.string().min(1, "idinvearts es requerido"),
    idinveclas: zod_1.z.string().min(1, "idinveclas es requerido"),
    capa: zod_1.z.string().min(1, "capa es requerido")
});
exports.getProductsSellsFromFamilyQuerySchema = zod_1.z.object({
    cvefamilia: zod_1.z.string().min(1, "cvefamilia es requerido"),
});
exports.postSellBodySchema = zod_1.z.object({
    clavepago: zod_1.z.string().min(1, "clavepago es requerido"),
    idclientes: zod_1.z.string().min(1, "idclientes es requerido"),
    comments: zod_1.z.string().min(1, "comments es requerido"),
    domicilio: zod_1.z.string().min(1, "domicilio es requerido"),
    idviaenvio: zod_1.z.string().min(1, "idviaenvio es requerido")
});
exports.postSellQuery = zod_1.z.object({
    opcion: zod_1.z.preprocess((val) => Number(val), zod_1.z.union([zod_1.z.literal(2), zod_1.z.literal(4)])),
});
//# sourceMappingURL=sellValidations.js.map