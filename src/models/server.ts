import express, { Application } from "express";
import cors from 'cors';
import { dbConnection } from "../database/connection";
import inverRouter from '../routes/inverartRouter';
import codebarRouter from '../routes/codebarRouter';

class Server {
    public app: Application;
    private port: string;
    private paths: {
        invearts: string,
        codebar: string
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || "5001";
        this.paths = {
            invearts: "/api/invearts",
            codebar: "/api/codebar",

        }

        //Connect to database
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
        this.app.use(this.paths.codebar, codebarRouter);

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en puerto " + this.port)
        })
    };
}

export default Server;