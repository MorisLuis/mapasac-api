"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utilsQuery = void 0;
exports.utilsQuery = {
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
            nombres,
            ncomercial
        FROM mapasoft.clientes
            WHERE nombres !=  ''
        ORDER BY nombres ASC
        OFFSET ($1 - 1) * $2
        LIMIT $2;
    `,
    getAddressDirection: `
        SELECT
            telefono,
            direccion,
            numero,
            colonia,
            descrip as estado
        FROM mapasoft.vw_pvtadomi
        WHERE idpvtadomi = $1
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
    insertErrorFrontend: `
        INSERT INTO mapasoft.efronend (fecha, noempleado, linea, corregido, mensaje)
        VALUES (
            CURRENT_TIMESTAMP AT TIME ZONE 'America/Mexico_City',
            $1,
            0,
            false,
            $2
        )
    `,
    insertErrorBackend: `
        INSERT INTO mapasoft.ebackend (fecha, noempleado, linea, mensaje, pc)
        VALUES (
            CURRENT_TIMESTAMP AT TIME ZONE 'America/Mexico_City',
            $1,
            0,
            $2,
            'movil'
        );
    `
};
//# sourceMappingURL=utilsQuery.js.map