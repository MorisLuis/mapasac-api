export interface UnitsInterface {
    idinveunid: string;
    unidad: string;
    descripcio: string;
    abrevia: string;
}

export interface ClientInterface {
    idclientes: string;
    nombres: string;
    ncomercial: string;
}

export interface TypePaymentsInterface {
    idtipopago: string;
    clavepago: string;
    descrip: string;
};

export interface AddressInterface {
    telefono: string;
    direccion: string;
    numero: string;
    colonia: string;
    estado: string;
};

export interface ModuleInterface {
    idappmob: string;
    permisos: string;
    appmob: string;
    activo: string;
}