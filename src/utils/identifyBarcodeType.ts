
export const identifyBarcodeType = (codebar?: string): string | null => {
    if (!codebar) return null; // Verificación rápida para cadenas undefined o null
    // Verificar la longitud del código
    if (codebar.length === 12) {
        return "UPC-A";
    } else if (codebar.length === 13) {
        if (codebar.startsWith("0") && codebar.substring(1).match(/^\d{12}$/)) {
            return "UPC-A convertido a EAN-13";
        } else {
            return "EAN-13";
        }
    } else {
        return "Código de barras inválido";
    }
};


export const guessBarcodeType = (code: string): boolean => {

    if (/^[0-9]{12}$/.test(code)) {
        //UPC-A
        return true;
    } else if (/^[0-9]{12,13}$/.test(code)) {
        //EAN-13
        return true;
    }

    return false;
};


export const verifyIfIsEAN13 = (code: string): boolean => {

    //EAN13
    if (/^[0-9]{13}$/.test(code)) {
        return true;
    }

    return false;
};