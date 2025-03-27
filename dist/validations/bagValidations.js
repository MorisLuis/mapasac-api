"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBagQuerySchema = void 0;
const zod_1 = require("zod");
exports.getBagQuerySchema = zod_1.z.object({
    option: zod_1.z.string().min(1, "option es requerido"),
    page: zod_1.z.string().min(1, "page es requerido"),
    limit: zod_1.z.string().min(1, "limit es requerido"),
});
//# sourceMappingURL=bagValidations.js.map