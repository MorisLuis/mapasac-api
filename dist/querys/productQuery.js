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
    getProductByClave: `
        SELECT  
            idinvearts,
            codbarras,
            producto,
            clave,
            precio1 
        FROM mapasoft.invearts
        WHERE clave = $1
    `,
    getProductById: `
        SELECT
            idinvearts,
            codbarras,
            producto,
            clave,
            precio1 
        FROM mapasoft.invearts
        WHERE idinvearts = $1
    `,
    getProductByCodebar: `
        SELECT * FROM mapasoft.invearts
        WHERE codbarras = $1
    `,
    updateProduct: `
        UPDATE mapasoft.invearts 
        SET $SET_CLAUSES 
        WHERE idinvearts = $1
    `
};
//# sourceMappingURL=productQuery.js.map