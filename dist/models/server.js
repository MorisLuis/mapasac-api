"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = require("../database/connection");
// Rutas
const inverartRouter_1 = __importDefault(require("../routes/inverartRouter"));
const authRouter_1 = __importDefault(require("../routes/authRouter"));
const productRouter_1 = __importDefault(require("../routes/productRouter"));
const searchRouter_1 = __importDefault(require("../routes/searchRouter"));
const utilsRouter_1 = __importDefault(require("../routes/utilsRouter"));
const bagRouter_1 = __importDefault(require("../routes/bagRouter"));
const errorRouter_1 = __importDefault(require("../routes/errorRouter"));
const errorHandler_1 = require("../middleware/errorHandler");
const CustomError_1 = require("../errors/CustomError");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "5001";
        this.paths = {
            auth: "/api/auth",
            invearts: "/api/invearts",
            product: "/api/product",
            search: "/api/search",
            utils: "/api/utils",
            bag: "/api/bag",
            errors: "/api/errors"
        };
        this.connectDB();
        this.middlewares();
        this.routes();
        this.errorHandler();
    }
    async connectDB() {
        try {
            await (0, connection_1.dbConnectionInitial)();
        }
        catch (error) {
            console.error('Error al conectar a la base de datos:', error);
            throw new CustomError_1.AppError('Error al conectar a la base de datos');
        }
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json({ limit: '50mb' }));
        this.app.use(express_1.default.urlencoded({ extended: true, limit: '50mb' }));
    }
    routes() {
        this.app.use(this.paths.invearts, inverartRouter_1.default);
        this.app.use(this.paths.auth, authRouter_1.default);
        this.app.use(this.paths.product, productRouter_1.default);
        this.app.use(this.paths.search, searchRouter_1.default);
        this.app.use(this.paths.utils, utilsRouter_1.default);
        this.app.use(this.paths.bag, bagRouter_1.default);
        this.app.use(this.paths.errors, errorRouter_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en puerto " + this.port);
        });
    }
    ;
    errorHandler() {
        // Usa el middleware de manejo de errores
        this.app.use(errorHandler_1.errorHandler);
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map