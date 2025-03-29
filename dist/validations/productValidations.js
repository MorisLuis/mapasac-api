"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductCodebarBodySchema = exports.inveArtsParamsSchema = exports.inveArtsBodySchema = exports.getProductByNoArticuloQuerySchema = exports.getProducByCodebarQuerySchema = exports.getProductByIdQuerySchema = exports.getProductByClaveQuerySchema = exports.getProductsQuerySchema = void 0;
const zod_1 = require("zod");
exports.getProductsQuerySchema = zod_1.z.object({
    page: zod_1.z.union([zod_1.z.string(), zod_1.z.number()])
        .transform((val) => Number(val))
        .refine((val) => !isNaN(val), { message: "page debe ser un número válido" }),
    limit: zod_1.z.union([zod_1.z.string(), zod_1.z.number()])
        .transform((val) => Number(val))
        .refine((val) => !isNaN(val), { message: "limit debe ser un número válido" })
});
exports.getProductByClaveQuerySchema = zod_1.z.object({
    clave: zod_1.z.string().min(1, "clave es requerido")
});
exports.getProductByIdQuerySchema = zod_1.z.object({
    idinvearts: zod_1.z.string().min(1, "idinvearts es requerido")
});
exports.getProducByCodebarQuerySchema = zod_1.z.object({
    codbarras: zod_1.z.string().min(1, "codbarras es requerido")
});
exports.getProductByNoArticuloQuerySchema = zod_1.z.object({
    noarticulo: zod_1.z.string().min(1, "noarticulo es requerido")
});
exports.inveArtsBodySchema = zod_1.z.object({
    idinvearts: zod_1.z.number().optional(),
    noarticulo: zod_1.z.number().optional(),
    cvefamilia: zod_1.z.number().optional(),
    codbarras: zod_1.z.string().optional(),
    producto: zod_1.z.string().optional(),
    clave: zod_1.z.string().optional(),
    precio1: zod_1.z.number().optional(),
    unidad: zod_1.z.number().optional(),
    // Campos adicionales de ProductInterface
    familia: zod_1.z.string().optional(),
    precio: zod_1.z.number().optional(), // ❗ Requerido en la interfaz
    cantidad: zod_1.z.number().optional(),
    idenlacemob: zod_1.z.number().optional(), // ❗ Requerido en la interfaz
    unidad_nombre: zod_1.z.string().optional(),
});
exports.inveArtsParamsSchema = zod_1.z.object({
    idinvearts: zod_1.z.string().min(1, "idinvearts es requerido")
});
exports.updateProductCodebarBodySchema = zod_1.z.object({
    codbarras: zod_1.z.string()
});
//# sourceMappingURL=productValidations.js.map