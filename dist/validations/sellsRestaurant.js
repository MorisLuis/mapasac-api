"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductSellsRestaurantDetailsQuerySchema = exports.getProductsSellsRestaurantQuerySchema = void 0;
const zod_1 = require("zod");
exports.getProductsSellsRestaurantQuerySchema = zod_1.z.object({
    page: zod_1.z.string().min(1, "page es requerido"),
    limit: zod_1.z.string().min(1, "limit es requerido"),
});
exports.getProductSellsRestaurantDetailsQuerySchema = zod_1.z.object({
    cvefamilia: zod_1.z.string().min(1, "cvefamilia es requerido"),
});
//# sourceMappingURL=sellsRestaurant.js.map