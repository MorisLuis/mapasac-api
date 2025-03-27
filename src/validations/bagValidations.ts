import { z } from "zod";

export const getBagQuerySchema = z.object({
    option: z.string().min(1, "option es requerido"),
    page: z.string().min(1, "page es requerido"),
    limit: z.string().min(1, "limit es requerido"),
});


export const getTotalProductsInBagQuerySchema = z.object({
    opcion: z.string().min(1, "option es requerido"),
});


export const insertProductToBagBodySchema = z.object({
    idinvearts: z.coerce.number(), // Convierte string a number si es necesario
    codbarras: z.string().optional(),
    unidad: z.coerce.number(),
    cantidad: z.coerce.number(),
    precio: z.coerce.number(),
    opcion: z.coerce.number().optional(),
    capa: z.string().optional(),
    idinveclas: z.coerce.number().optional(),
    comentario: z.string().optional()
});

