import { z } from "zod";

export const getProductsSellsQuerySchema = z.object({
    page: z.string().min(1, "page es requerido"),
    limit: z.string().min(1, "limit es requerido"),
});

export const getProductByEnlacemobQuerySchema = z.object({
    idinvearts: z.string().min(1, "idinvearts es requerido"),
    idinveclas: z.string().min(1, "idinveclas es requerido"),
    capa: z.string().min(1, "capa es requerido")
})

export const getProductsSellsFromFamilyQuerySchema = z.object({
    cvefamilia: z.string().min(1, "cvefamilia es requerido"),
})


export const postSellBodySchema = z.object({
    clavepago: z.number().min(1, "clavepago es requerido"),
    idclientes: z.number().min(1, "idclientes es requerido"),
    comments: z.string().optional(),
    domicilio: z.string().optional(),
    idviaenvio: z.string().optional()
});


export const postSellQuery = z.object({
    opcion: z.preprocess(
        (val) => Number(val),
        z.union([z.literal(2), z.literal(4)])
    ),
});

