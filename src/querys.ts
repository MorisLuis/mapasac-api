export const querys = {

    inveart: ` 
        SELECT * FROM mapasoft.invearts
        ORDER BY idinvearts ASC 
        OFFSET ($1 - 1) * $2
        LIMIT $2;
    `,

    updateCodbar: `
        UPDATE mapasoft.invearts
        SET codbarras = $1
        WHERE idinvearts = $2
    `,

    getByCodebar: `
        SELECT * FROM mapasoft.invearts
        WHERE codbarras = $1
    `,

    getByClave: `
        SELECT * FROM mapasoft.invearts
        WHERE clave = $1
    `,

    getById: `
        SELECT * FROM mapasoft.invearts
        WHERE idinvearts = $1
    `,

    insertInventoryDetails: `
        INSERT INTO mapasoft.inventarioDetalles (inventarioDetalleID, Folio, Fecha, Partida, Id_Almacen, Id_Ubicacion, Clave, producto, precio1, idinvearts)
        VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING inventarioDetalleID, Folio, Fecha, producto
    `
}