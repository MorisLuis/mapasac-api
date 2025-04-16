import { z } from "zod";

export const getProductsQuerySchema = z.object({
    page: z.union([z.string(), z.number()])
        .transform((val) => Number(val))
        .refine((val) => !isNaN(val), { message: "page debe ser un número válido" }),

    limit: z.union([z.string(), z.number()])
        .transform((val) => Number(val))
        .refine((val) => !isNaN(val), { message: "limit debe ser un número válido" }),
    codebarEmpty: z
        .union([z.string(), z.boolean()])
        .optional()
        .transform((val) => {
            if (val === 'true' || val === true) return true;
            if (val === 'false' || val === false) return false;
            return undefined;
        }),
});


export const getProductByClaveQuerySchema = z.object({
    clave: z.string().min(1, "clave es requerido")
});

export const getProductByIdQuerySchema = z.object({
    idinvearts: z.string().min(1, "idinvearts es requerido")
});

export const getProducByCodebarQuerySchema = z.object({
    codbarras: z.string().min(1, "codbarras es requerido")
});

export const getProductByNoArticuloQuerySchema = z.object({
    noarticulo: z.string().min(1, "noarticulo es requerido")
})

export const inveArtsBodySchema = z.object({
    idinvearts: z.number().optional(),
    noarticulo: z.number().optional(),
    cvefamilia: z.number().optional(),
    codbarras: z.string().optional(),
    producto: z.string().optional(),
    clave: z.string().optional(),
    precio: z.number().optional(),
    unidad: z.number().optional(),

    // Campos adicionales de ProductInterface
    familia: z.string().optional(),
    cantidad: z.number().optional(),
    idenlacemob: z.number().optional(), // ❗ Requerido en la interfaz
    unidad_nombre: z.string().optional(),
});


export const inveArtsParamsSchema = z.object({
    idinvearts: z.string().min(1, "idinvearts es requerido")
})


export const updateProductCodebarBodySchema = z.object({
    codbarras: z.string()
})


