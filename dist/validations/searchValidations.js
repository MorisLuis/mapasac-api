"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProductInBagQuerySchema = exports.searchProductsQuerySchema = void 0;
const zod_1 = require("zod");
exports.searchProductsQuerySchema = zod_1.z.object({
    term: zod_1.z.string().min(1, "term es requerido"),
    codebarEmpty: zod_1.z
        .union([zod_1.z.string(), zod_1.z.boolean()])
        .optional()
        .transform((val) => {
        if (val === 'true' || val === true)
            return true;
        if (val === 'false' || val === false)
            return false;
        return undefined;
    }),
});
exports.searchProductInBagQuerySchema = zod_1.z.object({
    term: zod_1.z.string().min(1, "term es requerido"),
    opcion: zod_1.z.preprocess((val) => Number(val), zod_1.z.union([zod_1.z.literal(0), zod_1.z.literal(2), zod_1.z.literal(4)])),
});
//# sourceMappingURL=searchValidations.js.map