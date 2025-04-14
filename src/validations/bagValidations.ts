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
    idinvearts: z.coerce.number(),
    unidad: z.coerce.number(),
    cantidad: z.coerce.number(),
    precio: z.coerce.number(),
    opcion: z.coerce
        .number()
        .refine((val) => [0, 2, 4].includes(val), {
            message: "Opción debe ser 0, 2 o 4",
        }),
    codbarras: z.string().optional(),
    capa: z.string().optional(),
    idinveclas: z.coerce.number().optional(),
    comentario: z.string().optional(),
});
