import express, { Application } from "express";
import cors from 'cors';
import { dbConnection } from "../database/connection";
import inverRouter from '../routes/inverartRouter';
import authRouter from '../routes/authRouter';
import productRouter from '../routes/productRouter';
import searchRouter from '../routes/searchRouter';
import utilsRouter from '../routes/utilsRouter';
import bagRouter from '../routes/bagRouter';

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
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json({ limit: '50mb' }))
        this.app.use(express.urlencoded({ extended: true, limit: '50mb' }))
    }

    async connectDB() {
        await dbConnection()
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
            console.log("Servidor corriendo en puerto " + this.port)
        })
    };
}

export default Server;