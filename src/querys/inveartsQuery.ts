

export const inveartsQuerys = {

    createInventory: `
        UPDATE mapasoft.enlacemob
        SET opcion = 1, folcontado = $2
        WHERE opcion = 0 AND idusrmob = $1
    `,

    createSale: `
        UPDATE mapasoft.enlacemob
        SET  opcion = $4, folcontado = $2
        WHERE opcion = $3 AND idusrmob = $1
    `,

    createSaleTest: `
        UPDATE mapasoft.enlacemob
        SET 
            opcion = $1,
            folcontado = $2,
            comentario = COALESCE(NULLIF($3, ''), comentario),
            domicilio = COALESCE(NULLIF($4, ''), comentario),
            idviaenvio = COALESCE(NULLIF($5, 0), idviaenvio),
            clavepago = COALESCE(NULLIF($6, 0), clavepago),
            idclientes = COALESCE(NULLIF($7, 0), idclientes)
            WHERE opcion = $8 AND idusrmob = $9
    `,
}