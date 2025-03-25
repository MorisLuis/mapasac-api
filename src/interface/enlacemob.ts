

export interface EnlacemobInterface {
    idinvearts: number;
    unidad: number;
    cantidad: number;
    precio: number;
    idusrmob: number;
    opcion?: number;

    idenlacemob?: number;
    codbarras?: string;
    folcontado?: number;
    capa?: string;
    idinveclas?: number;
    comentario?: string;
    fecalta?: Date; 
}


export interface EnlacemobInterfaceTemp {
    idinvearts: number;
    unidad: number;
    cantidad: number;
    precio: number;
    idusrmob: number;
    opcion: number;

    idenlacemob: number;
    codbarras: string;
    folcontado: number;
    capa: string;
    idinveclas: number;
    comentario: string;
}