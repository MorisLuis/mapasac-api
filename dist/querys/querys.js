"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.querys = void 0;
exports.querys = {
    auth: `
        SELECT
            idusrmob,
            usr,
            pas,
            svr,
            dba,
            port,
            usrdba,
            pasdba
        FROM mapasoft.usrmob
        WHERE usr = $1
    `,
    getUserById: `
        SELECT
            idusrmob,
            usr,
            pas,
            svr,
            dba,
            port,
            usrdba,
            pasdba
        FROM mapasoft.usrmob
        WHERE idusrmob = $1
    `,
    updateCodbar: `
        UPDATE mapasoft.invearts
        SET codbarras = $1
        WHERE idinvearts = $2
    `,
    getFolio: `
        SELECT * FROM mapasoft.fn_pedidos_foliounico(1, $1, 1);
    `,
    getModules: `
        SELECT 
            P.idappmob,
            A.appmob
        FROM mapasoft.permob P
        JOIN mapasoft.appmob A ON P.idappmob = A.idappmob
        WHERE P.idusrmob = $1 AND A.activo = 1;
    `,
    createInventory: `
        UPDATE mapasoft.enlacemob
        SET opcion = 1, folcontado = $2
        WHERE opcion = 0 AND idusrmob = $1
    `,
    createSale: `
        UPDATE mapasoft.enlacemob
        SET opcion = 3, folcontado = $2
        WHERE opcion = 2 AND idusrmob = $1
    `
};
//# sourceMappingURL=querys.js.map