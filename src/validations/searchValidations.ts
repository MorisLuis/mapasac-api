import { z } from "zod";


export const searchProductInBagQuerySchema = z.object({
    term: z.string().min(1, "term es requerido"),
    opcion: z.preprocess(
        (val) => Number(val),
        z.union([z.literal(0), z.literal(2), z.literal(4)])
    ),
});
