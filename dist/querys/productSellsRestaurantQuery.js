"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSellsRestaurantQuerys = void 0;
exports.productSellsRestaurantQuerys = {
    // Restaurants
    getProductsSellsRestaurant: `
        SELECT 
            V.imagen,
            F.idinvefami,
            to_char(F.cvefamilia, 'FMFAM0000000'::text)::character(10) AS cvefamilia, 
            F.descripcio
        FROM mapasoft.vw_invefami_mob V
        JOIN  mapasoft.invefami F ON V.cvefamilia = F.cvefamilia
        ORDER BY F.idinvefami ASC
        OFFSET ($1 - 1) * $2
        LIMIT $2;
    `,
    getProductSellsRestaurantDetails: `
        WITH w AS (
            SELECT 
                idinvearts,
                to_char(invearts.noarticulo, 'FMART0000000'::text)::character(10) AS relacion, 
                invearts.noarticulo,                 
                to_char(invearts.cvefamilia, 'FMFAM0000000'::text)::character(10) AS cvefamilia, 
                invearts.producto::character(100) AS producto,
                invearts.clave, 
                invearts.precio1 AS precio,
                ''::character(20) AS capa,
                ''::character(25) AS ctipo,
                0::integer AS idinveclas,
                unidad
            FROM mapasoft.invearts
            WHERE invearts.cvefamilia = CAST(right($1, 5) AS integer)
            AND invearts.precio1 > 0 
            AND invearts.estatus = 1 
            AND invearts.negativo = FALSE 
            AND invearts.conceptofa = FALSE
        )
        SELECT 
            w.idinvearts,
            w.relacion, 
            w.noarticulo, 
            w.cvefamilia, 
            w.producto, 
            w.clave, 
            w.precio, 
            w.capa, 
            w.ctipo, 
            w.idinveclas,
            w.unidad
        FROM w
    `,
    getTotalProductsSellsRestaurant: `
        SELECT COUNT(*) as total FROM mapasoft.vw_invefami_mob
    `,
};
//# sourceMappingURL=productSellsRestaurantQuery.js.map