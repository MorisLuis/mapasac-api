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
    getFolio: `
        SELECT * FROM mapasoft.fn_pedidos_foliounico(1, $1, 1);
    `
};
//# sourceMappingURL=querys.js.map