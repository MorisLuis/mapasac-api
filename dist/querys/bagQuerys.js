"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bagQuerys = void 0;
exports.bagQuerys = {
    addProductToBag: `
        INSERT INTO mapasoft.enlacemob (idenlacemob, idinvearts, codbarras, unidad, cantidad, precio, idusrmob, opcion)
        VALUES
        ((SELECT COALESCE(MAX(idenlacemob), 0) + 1 FROM mapasoft.enlacemob), $1, $2, $3, $4, $5, $6, $7)
    `,
    updateProductFromBag: `
        UPDATE mapasoft.enlacemob
        SET cantidad = $1
        WHERE idenlacemob = $2
    `,
    deleteProductFromBag: `
        DELETE FROM mapasoft.enlacemob
        WHERE idenlacemob = $1
    `,
    getBag: `
        SELECT 
            I.producto,
            I.clave,
            E.idenlacemob,
            E.opcion,
            E.unidad,
            E.cantidad,
            E.precio,
            E.codbarras
            FROM mapasoft.enlacemob E
            JOIN mapasoft.invearts I ON E.idinvearts = I.idinvearts
        WHERE opcion = $1 AND E.idusrmob = $2
        ORDER BY idenlacemob ASC
        OFFSET ($3 - 1) * $4
        LIMIT $4;
    `,
    getTotalProductsInBag: `
        SELECT COUNT(*) FROM mapasoft.enlacemob
        WHERE opcion = $1
    `,
    deleteAllProductsInBag: `
        DELETE FROM mapasoft.enlacemob
        WHERE idusrmob = $1 AND opcion = $2
    `
};
//# sourceMappingURL=bagQuerys.js.map