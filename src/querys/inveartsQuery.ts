

export const inveartsQuerys = {

    createInventory: `
        UPDATE mapasoft.enlacemob
        SET opcion = 1, folcontado = $2
        WHERE opcion = 0 AND idusrmob = $1
    `,

    createSale: `
        UPDATE mapasoft.enlacemob
        SET opcion = $4, folcontado = $2
        WHERE opcion = $3 AND idusrmob = $1
    `
}