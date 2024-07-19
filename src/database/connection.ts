import { Pool, PoolConfig } from "pg";
import config from "../config";

const poolConfig: PoolConfig = {
    host: config.host,
    user: config.user,
    password: config.password,
    port: config.port,
    database: config.database,
    max: 10, // Número máximo de conexiones en el pool
    idleTimeoutMillis: 30000, // Tiempo de espera para cerrar conexiones inactivas
    connectionTimeoutMillis: 2000 // Tiempo de espera para conectar
};

const pool = new Pool(poolConfig);

export const dbConnection = async () => {
    console.log("Connected to the database!");
    return pool;
};