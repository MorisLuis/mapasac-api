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
    clavepago: z.string().min(1, "clavepago es requerido"),
    idclientes: z.string().min(1, "idclientes es requerido"),
    comments: z.string().min(1, "comments es requerido"),
    domicilio: z.string().min(1, "domicilio es requerido"),
    idviaenvio: z.string().min(1, "idviaenvio es requerido"),
});


export const postSellQuery = z.object({
    opcion: z.preprocess(
        (val) => Number(val),
        z.union([z.literal(0), z.literal(2), z.literal(4)])
    ),
});
