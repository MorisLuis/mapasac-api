
// Market
export default interface ProductSellsFamilyInterface {
    rproducto?: string; // The name of the product
    ridinvearts?: number; //The id of the table invearts
    ridinveclas?: number; // The class id
    clase?: string; // The class name
    rcapa?: string; // The capa name
};

// Restaurant
export default interface ProductSellsRestaurantFamilyInterface {
    imagen: string;
    idinvefami: number;
    cvefamilia: string;
    descripcio: string;
};

export default interface ProductSellsRestaurantInterface {
    relacion: string;
    noarticulo: number;
    cvefamilia: string;
    producto: string;
    clave?: string;
    precio: number;
    capa?: string;
    ctipo?: string;
    idinveclas: number;
}