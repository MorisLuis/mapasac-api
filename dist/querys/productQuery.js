"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productQuerys = void 0;
exports.productQuerys = {
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
            P.unidad,
            U.descripcio AS unidad_nombre,
            F.descripcio AS Familia
        FROM mapasoft.invearts P
            JOIN mapasoft.inveunid U ON P.unidad = U.unidad
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
            P.unidad,
            U.descripcio AS unidad_nombre,
            F.descripcio AS Familia
        FROM mapasoft.invearts P
            JOIN mapasoft.inveunid U ON P.unidad = U.unidad
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
            P.unidad,
            U.descripcio AS unidad_nombre,
            F.descripcio AS Familia
        FROM mapasoft.invearts P
            JOIN mapasoft.inveunid U ON P.unidad = U.unidad
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
    `,
    getProductsSells: `
        SELECT 
            V.imagen,
            F.idinvefami,
            F.cvefamilia,
            F.descripcio
        FROM mapasoft.vw_invefami_mob V
        JOIN  mapasoft.invefami F ON V.cvefamilia = F.cvefamilia
        ORDER BY 
            F.idinvefami ASC
        OFFSET ($1 - 1) * $2
        LIMIT $2;
    `,
    getTotalProductsSells: `
        SELECT COUNT(*)
        FROM mapasoft.vw_invefami_mob V
        JOIN  mapasoft.invefami F ON V.cvefamilia = F.cvefamilia
    `,
    getProductsSellsFromFamily: `
        SELECT * FROM mapasoft.fn_invearts_cvefamilia_mob($1)
    `
};
//# sourceMappingURL=productQuery.js.map