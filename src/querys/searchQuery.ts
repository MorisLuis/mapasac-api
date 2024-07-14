
export const searchQuerys = {

    searchProduct: `
        SELECT
            idinvearts,
            codbarras,
            producto,
            clave,
            precio1 
        FROM mapasoft.invearts
        WHERE producto ILIKE '%' || $1 || '%'
        OR clave ILIKE $1 || '%'
    `
}