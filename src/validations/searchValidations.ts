import { z } from "zod";

export const searchProductsQuerySchema = z.object({
    term: z.string().min(1, "term es requerido"),
    codebarEmpty: z
        .union([z.string(), z.boolean()])
        .optional()
        .transform((val) => {
            if (val === 'true' || val === true) return true;
            if (val === 'false' || val === false) return false;
            return undefined;
        }),
});



export const searchProductInBagQuerySchema = z.object({
    term: z.string().min(1, "term es requerido"),
    opcion: z.preprocess(
        (val) => Number(val),
        z.union([z.literal(0), z.literal(2), z.literal(4)])
    ),
});
