export interface InveArtsInterface {
    idinvearts: number;
    noarticulo: number;
    cvefamilia: number;
    cvelinea: number;
    cvemarca: number;
    codbarras: string;
    producto: string;
    clave: string;
    unidad: number;
    minimo: number;
    precio1: number;
    estatus: number;
    nousuario: number;
    unidadc: number;
}

// Table: invearts
export interface ProductInterface extends Pick<InveArtsInterface, 'idinvearts' | 'noarticulo' | 'cvefamilia' | 'codbarras' | 'producto' | 'clave' | 'precio1' | 'unidad'> {
    familia?: string;
    precio: number;
    cantidad?: number;
    idenlacemob: number;
    unidad_nombre?: string;
}

// Table: fn_invearts_cvefamilia_mob
export interface ProductSellsInterface extends Pick<InveArtsInterface, 'producto'> {
    imagen: string;
    idinvefami: number;
    cvefamilia?: number;
    descripcio: string;
    ridinvearts?: number;
    ridinveclas?: number;
    capa?: string;
    cantidad?: number;
    precio: number;
    classcount?: string;
    idenlacemob: number;
    unidad_nombre?: string;
}

// Table: ProductSellsRestaurantInterface
export interface ProductSellsRestaurantInterface extends Pick<InveArtsInterface, 'idinvearts' | 'noarticulo' | 'producto' | 'clave' | 'unidad'> {
    imagen: string;
    idinvefami: number;
    cvefamilia?: number;
    descripcio: string;
    relacion: string;
    precio: number;
    capa?: string;
    ctipo?: string;
    idinveclas: number;
    comentario?: string;
    cantidad?: number;
    idenlacemob: number;
    unidad_nombre?: string;
}

export interface ProductSellsFamilyInterface {
    rproducto: string;
    ridinvearts: string;
    ridinveclas: string;
    rcapa: string;
    Clase: string;
};