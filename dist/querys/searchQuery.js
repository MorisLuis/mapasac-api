"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchQuerys = void 0;
exports.searchQuerys = {
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
};
//# sourceMappingURL=searchQuery.js.map