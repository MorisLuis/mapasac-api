export type opcionBag = 0 | 2 | 4;

export interface BagInterface {
    producto: string;
    clave: string;
    unidad_nombre: string;
    idenlacemob: number;
    opcion: opcionBag;
    unidad: string;
    cantidad: number;
    precio: string;
    codbarras: string;
    comentario: string;
    capa: string;
    Clase: string;
}