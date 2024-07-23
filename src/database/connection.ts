import { Pool, PoolConfig } from "pg";
import config from "../config";
import { getDbConfig } from "../utils/getDbConfig";
import NodeCache from "node-cache";
const cache = new NodeCache({ stdTTL: 86400, checkperiod: 600 }); // TTL de 1 dia, checkperiod de 10 minutos

export const dbConnectionInitial = async () => {
    let poolConfig: PoolConfig;

    poolConfig = {
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
    console.log("Connected to the database initial!");
    return pool;

}

export const dbConnection = async (idusrmob?: number) => {
    let poolConfig: PoolConfig;

    if (idusrmob) {

        // Verificar si la configuración de la base de datos está en el caché.
        const cachedConfig = cache.get<PoolConfig>(`dbConfig_${idusrmob}`);
        if (cachedConfig) {
            console.log("Using cached database configuration");
            return new Pool(cachedConfig);
        }

        const poolInitial = await dbConnectionInitial()
        const dbConfig = await getDbConfig({ idusrmob, poolInitial })

        // Guardar la configuración en el caché.
        cache.set(`dbConfig_${idusrmob}`, dbConfig);

        poolConfig = {
            ...dbConfig,

            max: 10,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000
        };

        const pool = new Pool(poolConfig);
        console.log("Connected to the database!");
        return pool;
    } else {
        const pool = await dbConnectionInitial()
        return pool;
    }

};