"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProductInBagQuerySchema = void 0;
const zod_1 = require("zod");
exports.searchProductInBagQuerySchema = zod_1.z.object({
    term: zod_1.z.string().min(1, "term es requerido"),
    opcion: zod_1.z.preprocess((val) => Number(val), zod_1.z.union([zod_1.z.literal(0), zod_1.z.literal(2), zod_1.z.literal(4)])),
});
//# sourceMappingURL=searchValidations.js.map