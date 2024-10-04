"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bagQuerys = void 0;
exports.bagQuerys = {
    getBag: `
        SELECT 
            I.producto,
            I.clave,
            E.idenlacemob,
            E.opcion,
            E.unidad,
            E.cantidad,
            U.descripcio AS unidad_nombre,
            E.precio,
            E.codbarras,
            E.comentario
        FROM mapasoft.enlacemob E
            JOIN mapasoft.invearts I ON E.idinvearts = I.idinvearts
            JOIN mapasoft.inveunid U ON E.unidad = U.unidad
        WHERE opcion = $1 AND E.idusrmob = $2
        ORDER BY idenlacemob ASC
        OFFSET ($3 - 1) * $4
        LIMIT $4;
    `,
    getTotalProductsInBag: `
        SELECT COUNT(*) FROM mapasoft.enlacemob
        WHERE opcion = $1 AND idusrmob = $2
    `,
    getTotalPriceBag: `
        SELECT SUM(E.precio * E.cantidad) AS total
        FROM mapasoft.enlacemob E
        WHERE E.opcion = $1 AND E.idusrmob = $2;
    `,
    /* insertPoductToBag */
    addProductSellToBag: `
        INSERT INTO mapasoft.enlacemob (idenlacemob, idinvearts, unidad, cantidad, precio, idusrmob, opcion, codbarras, idinveclas, capa, comentario )
        VALUES
        ((SELECT COALESCE(MAX(idenlacemob), 0) + 1 FROM mapasoft.enlacemob), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    `,
    /* updatePoductFromBag */
    updateProductFromBag: `
        UPDATE mapasoft.enlacemob
        SET 
            cantidad = COALESCE(NULLIF($1, 0), cantidad),
            comentario = COALESCE(NULLIF($2, ''), comentario)
        WHERE idenlacemob = $3;
    `,
    updateProductCommentsFromBag: `
        UPDATE mapasoft.enlacemob
        SET comentario = $1, idclientes = $2, clavepago = $3
        WHERE idusrmob = $4 AND opcion = 2
    `,
    updateProductDomicilioFromBag: `
        UPDATE mapasoft.enlacemob
        SET domicilio = $1, idclientes = $2, clavepago = $3
        WHERE idusrmob = $4 AND opcion = 4
    `,
    /* delete */
    deleteProductFromBag: `
        DELETE FROM mapasoft.enlacemob
        WHERE idenlacemob = $1
    `,
    deleteAllProductsInBag: `
        DELETE FROM mapasoft.enlacemob
        WHERE idusrmob = $1 AND opcion = $2
    `
};
//# sourceMappingURL=bagQuerys.js.map