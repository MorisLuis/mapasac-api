"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.utilsController = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const image_1 = require("../image");
const utilsController = async (req, res) => {
    try {
        const binaryData = Buffer.from(image_1.imageBinary, 'base64');
        const outputImagePath = path_1.default.join(__dirname, '../', 'output.png'); // Ajusta la ruta donde quieres guardar la imagen
        fs_1.default.writeFileSync(outputImagePath, binaryData);
        res.status(200).json({ ok: true }); // Usamos base64 para representar los datos binarios como texto
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
exports.utilsController = utilsController;
//# sourceMappingURL=utils.js.map