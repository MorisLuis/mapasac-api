"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
// server.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = require("../database/connection");
const ioredis_1 = __importDefault(require("ioredis"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const express_session_1 = __importDefault(require("express-session"));
// Rutas
const inverartRouter_1 = __importDefault(require("../routes/inverartRouter"));
const authRouter_1 = __importDefault(require("../routes/authRouter"));
const productRouter_1 = __importDefault(require("../routes/productRouter"));
const searchRouter_1 = __importDefault(require("../routes/searchRouter"));
const utilsRouter_1 = __importDefault(require("../routes/utilsRouter"));
const bagRouter_1 = __importDefault(require("../routes/bagRouter"));
const errorRouter_1 = __importDefault(require("../routes/errorRouter"));
const errorHandler_1 = require("../middleware/errorHandler");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "5001";
        this.redis = null;
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
        this.configureRedis();
        this.configureSessions();
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
            throw new errorHandler_1.DatabaseError('Error al conectar a la base de datos');
        }
    }
    configureRedis() {
        try {
            this.redis = new ioredis_1.default({
                host: process.env.REDIS_HOST || '127.0.0.1',
                port: Number(process.env.REDIS_PORT) || 6379,
                password: process.env.REDIS_PASSWORD
            });
            this.redis.on('connect', () => {
                console.log('Conectado a Redis');
            });
            this.redis.on('error', (err) => {
                console.error('Error de conexión a Redis:', err);
                throw new errorHandler_1.DatabaseError('Error de conexión a Redis');
            });
        }
        catch (error) {
            console.error('Error al configurar Redis:', error);
            throw new errorHandler_1.DatabaseError('Error al configurar Redis');
        }
    }
    configureSessions() {
        if (this.redis) {
            const oneYearInSeconds = 28800; // 8 horas
            const oneYearInMilliseconds = oneYearInSeconds * 1000; // 8 horas en milisegundos
            const store = new connect_redis_1.default({
                client: this.redis,
                ttl: oneYearInSeconds,
            });
            this.app.use((0, express_session_1.default)({
                secret: process.env.REDIS_SECRET,
                name: 'sid',
                store: store,
                resave: false,
                saveUninitialized: false,
                cookie: {
                    secure: 'auto',
                    httpOnly: true,
                    maxAge: oneYearInMilliseconds, // MaxAge en milisegundos para la cookie
                    sameSite: 'lax'
                }
            }));
        }
        else {
            console.error('Redis no está configurado, las sesiones no se almacenarán en Redis');
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
    errorHandler() {
        // Usa el middleware de manejo de errores
        this.app.use(errorHandler_1.errorHandler);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en puerto " + this.port);
        });
    }
}
exports.default = Server;
// Exportar la instancia de Redis
const server = new Server();
exports.redisClient = server.redis;
//# sourceMappingURL=server.js.map