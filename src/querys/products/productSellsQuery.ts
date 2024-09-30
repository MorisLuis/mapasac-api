/* SELLS */
export const productSellsQuerys = {

    /* Market */
    getProductsSells: `
        SELECT 
            V.imagen,
            F.idinvefami,
            F.cvefamilia,
            F.descripcio,
            ( SELECT COUNT(*) FROM mapasoft.fn_invearts_cvefamilia_mob(F.cvefamilia) ) AS classCount
        FROM mapasoft.vw_invefami_mob V
        JOIN  mapasoft.invefami F ON V.cvefamilia = F.cvefamilia
        ORDER BY F.idinvefami ASC
        OFFSET ($1 - 1) * $2
        LIMIT $2;
    `,

    getTotalProductsSells: `
        SELECT COUNT(*) as total FROM mapasoft.vw_invefami_mob
    `,

    getTotalClassesSells: `
        SELECT COUNT(*)
        FROM mapasoft.fn_invearts_cvefamilia_mob($1) F
        JOIN mapasoft.inveclas C ON C.idinveclas = F.ridinveclas
    `,

    getProductsSellsFromFamily: `
        SELECT 
            F.rproducto,
            F.ridinvearts,
            F.ridinveclas,
            F.rcapa,
            C.descripcio AS Clase
            FROM mapasoft.fn_invearts_cvefamilia_mob($1) F
        JOIN mapasoft.inveclas C ON C.idinveclas = F.ridinveclas
    `,

    getUnits: `
        SELECT 
            idinveunid,
            unidad,
            descripcio,
            abrevia
            FROM mapasoft.inveunid
        WHERE activo = 1
    `,

    getProductByEnlacemob: `
        WITH RankedRows AS (
            SELECT 
                E.unidad,
                E.precio,
                U.descripcio AS unidad_nombre,
                U.decimales,
                E.idinvearts,
                E.idenlacemob,
                E.idinveclas,
                E.capa,
                E.codbarras,
                ROUND(E.cantidad, U.decimales::integer) AS cantidad,
                CASE 
                    WHEN E.idinveclas = $2 AND E.capa = $3 THEN 3
                    WHEN E.idinveclas = $2 THEN 2
                    WHEN E.capa = $3 THEN 1
                    ELSE 0
                END AS MatchScore
            FROM mapasoft.enlacemob E
            JOIN mapasoft.inveunid U ON E.unidad = U.unidad
            WHERE E.idinvearts = $1 AND E.idinveclas = $2
            ORDER BY idenlacemob DESC
        )
        SELECT *
        FROM RankedRows
        ORDER BY MatchScore DESC
        LIMIT(1)
    `,

    //TEMPORAL
    getIdinveartsProduct : `
        SELECT idinvearts FROM mapasoft.invearts WHERE cvefamilia = $1 AND estatus = 1
    `,


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
                to_char(invearts.noarticulo, 'FMART0000000'::text)::character(10) AS relacion, 
                invearts.noarticulo,                 
                to_char(invearts.cvefamilia, 'FMFAM0000000'::text)::character(10) AS cvefamilia, 
                invearts.producto::character(100) AS producto,
                invearts.clave, 
                invearts.precio1 AS precio,
                ''::character(20) AS capa,
                ''::character(25) AS ctipo,
                0::integer AS idinveclas,
                invearts.unidad
            FROM mapasoft.invearts
            WHERE invearts.cvefamilia = CAST(right($1, 5) AS integer)
            AND invearts.precio1 > 0 
            AND invearts.estatus = 1 
            AND invearts.negativo = FALSE 
            AND invearts.conceptofa = FALSE 
            AND NOT EXISTS (
                SELECT idinveclas 
                FROM mapasoft.inveclas 
                WHERE inveclas.noarticulo = invearts.noarticulo
            )
            
            UNION ALL
            
            SELECT 
                to_char(88888+((SELECT MAX(inveclas.noarticulo) FROM mapasoft.inveclas) + 
                ROW_NUMBER() OVER (ORDER BY inveclas.noarticulo)), 'FMART0000000'::text)::character(10) AS relacion,                 
                inveclas.noarticulo, 
                to_char(invefami.cvefamilia, 'FMFAM0000000'::text)::character(10) AS cvefamilia, 
                invearts.producto::character(100) AS producto,                 
                ''::character(20) AS clave, 
                inveclas.precio, 
                ''::character(20) AS capa, 
                inveclas.descripcio::character(25) AS ctipo, 
                inveclas.idinveclas,
                invearts.unidad
            FROM mapasoft.inveclas
            JOIN mapasoft.invearts ON inveclas.noarticulo = invearts.noarticulo
            JOIN mapasoft.invefami ON invearts.cvefamilia = invefami.cvefamilia
            WHERE invearts.cvefamilia = CAST(right($1, 5) AS integer)
            AND inveclas.tipo = 'F' 
            AND inveclas.estatus = 1 
            AND invearts.estatus = 1 
            AND invearts.negativo = FALSE 
            AND invearts.conceptofa = FALSE 
            AND invefami.touchscren = 1 
            AND inveclas.precio > 0
        )
        SELECT 
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
}