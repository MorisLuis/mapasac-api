"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = require("../database/connection");
const inverartRouter_1 = __importDefault(require("../routes/inverartRouter"));
const authRouter_1 = __importDefault(require("../routes/authRouter"));
const productRouter_1 = __importDefault(require("../routes/productRouter"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "5001";
        this.paths = {
            auth: "/api/auth",
            invearts: "/api/invearts",
            product: "/api/product"
        };
        // Connect to database
        this.connectDB();
        // Middlewares
        this.middlewares();
        // Routes of the app
        this.routes();
    }
    middlewares() {
        // CORS
        this.app.use((0, cors_1.default)());
        // Lectura y parseo del body
        this.app.use(express_1.default.json({ limit: '50mb' }));
        this.app.use(express_1.default.urlencoded({ extended: true, limit: '50mb' }));
    }
    async connectDB() {
        await (0, connection_1.dbConnection)();
    }
    routes() {
        this.app.use(this.paths.invearts, inverartRouter_1.default);
        this.app.use(this.paths.auth, authRouter_1.default);
        this.app.use(this.paths.product, productRouter_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en puerto " + this.port);
        });
    }
    ;
}
exports.default = Server;
//# sourceMappingURL=server.js.map