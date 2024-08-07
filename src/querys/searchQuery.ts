
export const searchQuerys = {

    searchProduct: `
        SELECT
            P.idinvearts,
            P.codbarras,
            P.producto,
            P.clave,
            P.precio1,
            P.cvefamilia,
            F.descripcio AS Familia
        FROM mapasoft.invearts P
            JOIN mapasoft.invefami F ON P.cvefamilia = F.cvefamilia
            WHERE producto ILIKE '%' || $1 || '%'
            OR clave ILIKE $1 || '%'
            LIMIT(10)
    `,

    searchProductInBag: `
        SELECT 
            I.producto,
            I.clave,
            E.idenlacemob,
            E.opcion,
            E.unidad,
            E.cantidad,
            U.descripcio AS unidad_nombre,
            E.precio,
            E.codbarras
        FROM mapasoft.enlacemob E
            JOIN mapasoft.invearts I ON E.idinvearts = I.idinvearts
            JOIN mapasoft.inveunid U ON E.unidad = U.unidad
        WHERE opcion = $1 AND E.idusrmob = $2 AND producto ILIKE '%' || $3 || '%'
        ORDER BY idenlacemob ASC
    `,

    searchProductInBagSells: `
        SELECT 
            I.producto,
            I.clave,
            E.idenlacemob,
            E.opcion,
            E.unidad,
            E.cantidad,
            U.descripcio AS unidad_nombre,
            E.precio,
            E.capa,
            E.codbarras,
            C.descripcio AS Clase
        FROM mapasoft.enlacemob E
            JOIN mapasoft.invearts I ON E.idinvearts = I.idinvearts
            JOIN mapasoft.inveunid U ON E.unidad = U.unidad
            JOIN mapasoft.inveclas C ON E.idinveclas = C.idinveclas
        WHERE opcion = $1 AND E.idusrmob = $2 AND producto ILIKE '%' || $3 || '%'
        ORDER BY idenlacemob ASC
    `
}