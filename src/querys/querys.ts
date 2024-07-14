export const querys = {

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

    insertInventoryDetails: `
        INSERT INTO mapasoft.inventarioDetalles (inventarioDetalleID, Folio, Fecha, Partida, Id_Almacen, Id_Ubicacion, Clave, producto, precio1, idinvearts)
        VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING inventarioDetalleID, Folio, Fecha, producto
    `
}