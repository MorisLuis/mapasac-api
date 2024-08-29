"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.querys = void 0;
exports.querys = {
    auth: `
        SELECT
            U.idusrmob,
            U.usr,
            U.pas,
            U.svr,
            U.dba,
            U.port,
            U.usrdba,
            U.pasdba,
            S.descripcio AS empresa,
            S.ncomercial AS razonsocial
        FROM mapasoft.usrmob U
        JOIN mapasoft.sucursal S ON U.idsucursal = S.idsucursal
        WHERE usr = $1
    `,
    getDbConfig: `
        SELECT
            idusrmob,
            usrdba,
            pas,
            svr,
            dba,
            port,
            pasdba
        FROM mapasoft.usrmob
        WHERE idusrmob = $1
    `,
    getUserById: `
        SELECT
            U.idusrmob,
            U.usr,
            U.pas,
            U.svr,
            U.dba,
            U.port,
            U.usrdba,
            U.pasdba,
            S.descripcio AS empresa,
            S.ncomercial AS razonsocial
        FROM mapasoft.usrmob U
        JOIN mapasoft.sucursal S ON U.idsucursal = S.idsucursal
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
            P.permisos,
            A.appmob,
            A.activo
        FROM mapasoft.permob P
        JOIN mapasoft.appmob A ON P.idappmob = A.idappmob
        WHERE P.idusrmob = $1 AND A.activo = 1 AND P.permisos = 1
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
    `,
    getPaymentType: `
        SELECT 
            idtipopago,
            clavepago,
            descrip
            FROM mapasoft.tipopago
        WHERE activo = true
    `,
    getClients: `
        SELECT 
            idclientes,
            nombres
        FROM mapasoft.clientes
            WHERE nombres !=  ''
        ORDER BY nombres ASC
        OFFSET ($1 - 1) * $2
        LIMIT $2;
    `
};
//# sourceMappingURL=querys.js.map