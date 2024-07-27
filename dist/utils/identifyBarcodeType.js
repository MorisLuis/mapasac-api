"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyIfIsEAN13 = exports.guessBarcodeType = exports.identifyBarcodeType = void 0;
const identifyBarcodeType = (codebar) => {
    if (!codebar)
        return null; // Verificación rápida para cadenas undefined o null
    // Verificar la longitud del código
    if (codebar.length === 12) {
        return "UPC-A";
    }
    else if (codebar.length === 13) {
        if (codebar.startsWith("0") && codebar.substring(1).match(/^\d{12}$/)) {
            return "UPC-A convertido a EAN-13";
        }
        else {
            return "EAN-13";
        }
    }
    else {
        return "Código de barras inválido";
    }
};
exports.identifyBarcodeType = identifyBarcodeType;
const guessBarcodeType = (code) => {
    if (/^[0-9]{12}$/.test(code)) {
        //UPC-A
        return true;
    }
    else if (/^[0-9]{12,13}$/.test(code)) {
        //EAN-13
        return true;
    }
    return false;
};
exports.guessBarcodeType = guessBarcodeType;
const verifyIfIsEAN13 = (code) => {
    //EAN13
    if (/^[0-9]{13}$/.test(code)) {
        return true;
    }
    return false;
};
exports.verifyIfIsEAN13 = verifyIfIsEAN13;
//# sourceMappingURL=identifyBarcodeType.js.map