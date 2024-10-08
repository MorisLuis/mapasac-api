export const barcodes = [
    {
        "type": "Libre",
        "id": 3,
        "regex": "^[A-Z0-9\\-.$/+% ]*$",
        "errorMessage": "Libre, no es el codigo de barras mas recomendado.",
        "keyboardType": "default",
        "maxLength": 100
    },
    {
        "type": "Code 128",
        "id": 1,
        "regex": "^[\\x00-\\x7F]*$",
        "errorMessage": "Code 128 puede contener cualquier carácter ASCII.",
        "keyboardType": "default",
        "maxLength": 100
    },
    {
        "type": "Code 39",
        "id": 2,
        "regex": "^[A-Z0-9\\-.$/+% ]*$",
        "errorMessage": "Code 39 debe ser alfanumérico con caracteres especiales permitidos (- . $ / + % ESPACIO).",
        "keyboardType": "default",
        "maxLength": 100
    },
    {
        "type": "EAN-8",
        "id": 4,
        "regex": "^[0-9]{8}$",
        "errorMessage": "EAN-8 debe tener 8 dígitos.",
        "keyboardType": "numeric",
        "maxLength": 8
    },
    {
        "type": "EAN-13",
        "id": 5,
        "regex": "^[0-9]{13}$",
        "errorMessage": "EAN-13 debe tener 13 dígitos.",
        "keyboardType": "numeric",
        "maxLength": 13
    },
    {
        "type": "UPC-A",
        "id": 6,
        "regex": "^[0-9]{12}$",
        "errorMessage": "UPC-A debe tener 12 dígitos.",
        "keyboardType": "numeric",
        "maxLength": 12
    },
    {
        "type": "UPC-E",
        "id": 7,
        "regex": "^[0-9]{6,8}$",
        "errorMessage": "UPC-E debe tener 6 u 8 dígitos.",
        "keyboardType": "numeric",
        "maxLength": 8
    }
]