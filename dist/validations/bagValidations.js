"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertProductToBagBodySchema = exports.getTotalProductsInBagQuerySchema = exports.getBagQuerySchema = void 0;
const zod_1 = require("zod");
exports.getBagQuerySchema = zod_1.z.object({
    option: zod_1.z.string().min(1, "option es requerido"),
    page: zod_1.z.string().min(1, "page es requerido"),
    limit: zod_1.z.string().min(1, "limit es requerido"),
});
exports.getTotalProductsInBagQuerySchema = zod_1.z.object({
    opcion: zod_1.z.string().min(1, "option es requerido"),
});
exports.insertProductToBagBodySchema = zod_1.z.object({
    idinvearts: zod_1.z.coerce.number(), // Convierte string a number si es necesario
    codbarras: zod_1.z.string().optional(),
    unidad: zod_1.z.coerce.number(),
    cantidad: zod_1.z.coerce.number(),
    precio: zod_1.z.coerce.number(),
    opcion: zod_1.z.coerce.number().optional(),
    capa: zod_1.z.string().optional(),
    idinveclas: zod_1.z.coerce.number().optional(),
    comentario: zod_1.z.string().optional()
});
//# sourceMappingURL=bagValidations.js.map