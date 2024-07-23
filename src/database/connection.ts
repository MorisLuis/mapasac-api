import { Pool, PoolConfig } from "pg";
import config from "../config";

const poolConfig: PoolConfig = {
    host: config.host,
    user: config.user,
    password: config.password,
    port: config.port,
    database: config.database,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
};

const pool = new Pool(poolConfig);

export const dbConnection = async () => {
    console.log("Connected to the database!");
    return pool;
};