

export interface EnlacemobInterface {
    idinvearts: number;
    unidad: number;
    cantidad: number;
    precio: number;
    idusrmob?: number;
    opcion?: number;

    idenlacemob?: number;
    codbarras?: string;
    folcontado?: number;
    capa?: string;
    idinveclas?: number;
    comentario?: string;
    fecalta?: Date;
};

export interface EnlacemobInterfaceSales {
    clavepago: number,
    idclientes: number,
    comments?: string,
    domicilio?: string,
    idviaenvio?: string
}