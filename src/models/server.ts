import express, { Application } from "express";
import cors from 'cors';
import { dbConnection } from "../database/connection";
import inverRouter from '../routes/inverartRouter';
import authRouter from '../routes/authRouter';
import productRouter from '../routes/productRouter';
import searchRouter from '../routes/searchRouter';
import utilsRouter from '../routes/utilsRouter';
import bagRouter from '../routes/bagRouter';
import { Pool } from "pg";

class Server {
    public app: Application;
    private port: string;
    private paths: {
        invearts: string,
        auth: string,
        product: string,
        search: string,
        utils: string,
        bag: string
    }
    private pool: Pool | undefined; // Añadir propiedad para el pool

    constructor() {
        this.app = express();
        this.port = process.env.PORT || "5001";
        this.paths = {
            auth: "/api/auth",
            invearts: "/api/invearts",
            product: "/api/product",
            search: "/api/search",
            utils: "/api/utils",
            bag: "/api/bag"
        }

        // Connect to database
        this.connectDB();

        // Middlewares
        this.middlewares();

        // Routes of the app
        this.routes();

        // Shutdown
        this.handleShutdown();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json({ limit: '50mb' }));
        this.app.use(express.urlencoded({ extended: true, limit: '50mb' }));
    }

    async connectDB() {
        this.pool = await dbConnection({});
    }

    routes() {
        this.app.use(this.paths.invearts, inverRouter);
        this.app.use(this.paths.auth, authRouter);
        this.app.use(this.paths.product, productRouter);
        this.app.use(this.paths.search, searchRouter);
        this.app.use(this.paths.utils, utilsRouter);
        this.app.use(this.paths.bag, bagRouter);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en puerto " + this.port);
        });
    };

    private handleShutdown() {
        process.on('SIGTERM', () => this.shutdown());
        process.on('SIGINT', () => this.shutdown());
    }

    private async shutdown() {
        console.log('Cerrando el servidor...');
        if (this.pool) {
            await this.pool.end();
        }
        process.exit(0);
    }
}

export default Server;