"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchQuerys = void 0;
exports.searchQuerys = {
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
    `
};
//# sourceMappingURL=searchQuery.js.map