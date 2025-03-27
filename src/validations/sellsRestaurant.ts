import { z } from "zod";


export const getProductsSellsRestaurantQuerySchema = z.object({
    page: z.string().min(1, "page es requerido"),
    limit: z.string().min(1, "limit es requerido"),
});


export const getProductSellsRestaurantDetailsQuerySchema = z.object({
    cvefamilia: z.string().min(1, "cvefamilia es requerido"),
})
