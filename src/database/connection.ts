import { Pool, PoolConfig } from "pg";
import config from "../config";
import { getDbConfig } from "../utils/getDbConfig";
import NodeCache from "node-cache";
const cache = new NodeCache({ stdTTL: 86400, checkperiod: 600 }); // TTL de 1 dia, checkperiod de 10 minutos

export const dbConnectionInitial = async (database?: string) => {
    let poolConfig: PoolConfig;

    poolConfig = {
        host: config.host,
        user: config.user,
        password: config.password,
        port: config.port,
        database: database ? database : config.database,

        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000
    };

    const pool = new Pool(poolConfig);
    console.log("Connected to the database initial!");
    return pool;
}

interface dbConnectionInterface {
    idusrmob?: number;
    database?: string // We specify when we will connect to 'mercado' database.
}

export const dbConnection = async ({ idusrmob, database }: dbConnectionInterface) => {
    let poolConfig: PoolConfig;

    if (idusrmob && database !== "desarrollo" ) {
        
        // We check the data in cache.
        const cachedConfig = cache.get<PoolConfig>(`dbConfig_${idusrmob}`);
        if(cachedConfig && database) {
            poolConfig = {
                ...cachedConfig,
                database
            };
            return new Pool(poolConfig);
        }

        if (cachedConfig) {
            return new Pool(cachedConfig);
        }

        let poolInitial;
        if (database) {
            poolInitial = await dbConnectionInitial(database);
        } else {
            poolInitial = await dbConnectionInitial();
        }

        const dbConfig = await getDbConfig({ idusrmob, poolInitial })

        if(!database){
            cache.set(`dbConfig_${idusrmob}`, dbConfig);
        }

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
        // This is the firs connection with the database
        const pool = await dbConnectionInitial()
        return pool;
    }

};