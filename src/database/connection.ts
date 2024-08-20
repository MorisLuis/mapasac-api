import { Pool, PoolConfig } from 'pg';
import config from '../config';
import { getDbConfig } from '../utils/getDbConfig';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 86400, checkperiod: 600 });

const POOL_MAX = 50;
const IDLE_TIMEOUT_MS = 30000;
const CONNECTION_TIMEOUT_MS = 5000;

interface DbConnectionOptions {
    idusrmob?: number;
    database?: string; 
}

// Map para almacenar pools por combinación de `idusrmob` y `database`
const pools: Map<string, Pool> = new Map();

export const dbConnection = async ({ idusrmob, database }: DbConnectionOptions): Promise<Pool> => {
    const key = `${idusrmob || 'default'}_${database || 'default'}`;
    
    if (pools.has(key)) {
        return pools.get(key)!;
    }

    let poolConfig: PoolConfig;
    const isUserConnection = idusrmob && database !== 'desarrollo';

    if (isUserConnection) {
        const cachedConfig = cache.get<PoolConfig>(`dbConfig_${idusrmob}`);
        if (cachedConfig) {
            poolConfig = { ...cachedConfig, database: database || cachedConfig.database };
        } else {
            const poolInitial = await dbConnectionInitial(); 
            const dbConfig = await getDbConfig({ idusrmob, poolInitial });

            if (!database) {
                cache.set(`dbConfig_${idusrmob}`, dbConfig);
            }

            poolConfig = {
                ...dbConfig,
                database: database || dbConfig.database,
                max: POOL_MAX,
                idleTimeoutMillis: IDLE_TIMEOUT_MS,
                connectionTimeoutMillis: CONNECTION_TIMEOUT_MS
            };
        }
    } else {
        poolConfig = {
            host: config.host,
            user: config.user,
            password: config.password,
            port: config.port,
            database: database || config.database,
            max: POOL_MAX,
            idleTimeoutMillis: IDLE_TIMEOUT_MS,
            connectionTimeoutMillis: CONNECTION_TIMEOUT_MS
        };
    }

    const pool = new Pool(poolConfig);
    pools.set(key, pool);
    return pool;
};

export const dbConnectionInitial = async (database?: string): Promise<Pool> => {
    const poolConfig: PoolConfig = {
        host: config.host,
        user: config.user,
        password: config.password,
        port: config.port,
        database: database || config.database,
        max: POOL_MAX,
        idleTimeoutMillis: IDLE_TIMEOUT_MS,
        connectionTimeoutMillis: CONNECTION_TIMEOUT_MS
    };

    return new Pool(poolConfig);
};
