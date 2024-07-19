export const productQuerys = {

    getProducts: ` 
        SELECT
            idinvearts,
            codbarras,
            producto,
            clave,
            precio1 
        FROM mapasoft.invearts
        ORDER BY idinvearts ASC 
        OFFSET ($1 - 1) * $2
        LIMIT $2;
    `,


    getTotalProducts: `
        SELECT COUNT(*) FROM mapasoft.invearts 
    `,

    getProductByClave: `
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
            WHERE clave = $1
    `,

    getProductById: `
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
        WHERE idinvearts =  $1
    `,

    getProductByCodebar: `
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
        WHERE codbarras = $1
    `,


    updateProduct: `
        UPDATE mapasoft.invearts 
        SET $SET_CLAUSES 
        WHERE idinvearts = $1
    `,

    updateCodebarProduct: `
        UPDATE mapasoft.invearts 
        SET codbarras = $1 
        WHERE idinvearts = $2
    `
}