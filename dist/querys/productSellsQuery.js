"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSellsQuerys = void 0;
exports.productSellsQuerys = {
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
    getIdinveartsProduct: `
        SELECT idinvearts FROM mapasoft.invearts WHERE cvefamilia = $1 AND estatus = 1
    `,
};
//# sourceMappingURL=productSellsQuery.js.map