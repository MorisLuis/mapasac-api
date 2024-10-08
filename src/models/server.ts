// server.ts
import express, { Application } from "express";
import cors from 'cors';
import { dbConnectionInitial } from "../database/connection";
import Redis from 'ioredis';
import RedisStore from 'connect-redis';
import session, { Store } from 'express-session';

// Rutas
import inverRouter from '../routes/inverartRouter';
import authRouter from '../routes/authRouter';
import productRouter from '../routes/productRouter';
import searchRouter from '../routes/searchRouter';
import utilsRouter from '../routes/utilsRouter';
import bagRouter from '../routes/bagRouter';
import errorRouter from '../routes/errorRouter';

class Server {
    public app: Application;
    private port: string;
    public redis: Redis | null;

    private paths: {
        invearts: string,
        auth: string,
        product: string,
        search: string,
        utils: string,
        bag: string,
        errors: string;
    }

    constructor() {
        this.app = express();
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
        }

        this.connectDB();
        this.configureRedis();
        this.configureSessions();
        this.middlewares();
        this.routes();
        this.errorHandler();
    }

    async connectDB() {
        await dbConnectionInitial();
    }

    configureRedis() {
        this.redis = new Redis({
            host: process.env.REDIS_HOST || '127.0.0.1',
            port: Number(process.env.REDIS_PORT as string) || 6379,
            password: process.env.REDIS_PASSWORD
        });

        this.redis.on('connect', () => {
            console.log('Conectado a Redis');
        });

        this.redis.on('error', (err) => {
            console.error('Error de conexión a Redis:', err);
        });
    }

    configureSessions() {
        if (this.redis) {
            const oneYearInSeconds = 28800; // 8 horas
            const oneYearInMilliseconds = oneYearInSeconds * 1000; // 8 horas en milisegundos
        
            const store = new RedisStore({
                client: this.redis,
                ttl: oneYearInSeconds,
            }) as Store;
    
            this.app.use(session({
                secret: process.env.REDIS_SECRET as string,
                name: 'sid',
                store: store,
                resave: false,
                saveUninitialized: false,
                cookie: {
                    secure:  'auto',
                    httpOnly: true,
                    maxAge: oneYearInMilliseconds, // MaxAge en milisegundos para la cookie
                    sameSite: 'lax'
                }
            }));
        } else {
            console.error('Redis no está configurado, las sesiones no se almacenarán en Redis');
        }
    }
    

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json({ limit: '50mb' }));
        this.app.use(express.urlencoded({ extended: true, limit: '50mb' }));
    }

    routes() {
        this.app.use(this.paths.invearts, inverRouter);
        this.app.use(this.paths.auth, authRouter);
        this.app.use(this.paths.product, productRouter);
        this.app.use(this.paths.search, searchRouter);
        this.app.use(this.paths.utils, utilsRouter);
        this.app.use(this.paths.bag, bagRouter);
        this.app.use(this.paths.errors, errorRouter);

    }

    errorHandler() {
        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.status(500).json({ error: 'Ocurrió un error en el servidor', err });
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en puerto " + this.port);
        });
    }
}

export default Server;

// Exportar la instancia de Redis
const server = new Server();
export const redisClient = server.redis;
