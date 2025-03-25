// server.ts
import express, { Application } from "express";
import cors from 'cors';
import { dbConnectionInitial } from "../database/connection";

// Rutas
import inverRouter from '../routes/inverartRouter';
import authRouter from '../routes/authRouter';
import productRouter from '../routes/productRouter';
import searchRouter from '../routes/searchRouter';
import utilsRouter from '../routes/utilsRouter';
import bagRouter from '../routes/bagRouter';
import errorRouter from '../routes/errorRouter';
import { errorHandler } from "../middleware/errorHandler";
import { AppError } from "../errors/CustomError";

class Server {
    public app: Application;
    private port: string;

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
        this.middlewares();
        this.routes();
        this.errorHandler();
    }

    async connectDB() {
        try {
            await dbConnectionInitial();
        } catch (error) {
            console.error('Error al conectar a la base de datos:', error);
            throw new AppError('Error al conectar a la base de datos');
        }
    }

    private middlewares(): void {
        this.app.use(cors());
        this.app.use(express.json({ limit: '50mb' }));
        this.app.use(express.urlencoded({ extended: true, limit: '50mb' }));
    }

    private routes() {
        this.app.use(this.paths.invearts, inverRouter);
        this.app.use(this.paths.auth, authRouter);
        this.app.use(this.paths.product, productRouter);
        this.app.use(this.paths.search, searchRouter);
        this.app.use(this.paths.utils, utilsRouter);
        this.app.use(this.paths.bag, bagRouter);
        this.app.use(this.paths.errors, errorRouter);
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en puerto " + this.port);
        });
    };

    errorHandler(): void {
        // Usa el middleware de manejo de errores
        this.app.use(errorHandler);
    }
}

export default Server;