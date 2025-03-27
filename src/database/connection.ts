import { Pool, PoolConfig } from 'pg';
import config from '../config';

const POOL_MAX = 50;
const IDLE_TIMEOUT_MS = 30000;
const CONNECTION_TIMEOUT_MS = 10000;

let globalPool: Pool | null = null;

const pools: Record<string, Pool> = {}; // Cache de pools

export const dbConnection = (config: { user: string; host: string; database: string; password: string; port: number }): Pool => {
    const key = `${config.host}_${config.database}_${config.user}`;

    if (!pools[key]) {
        pools[key] = new Pool({
            ...config,
            max: POOL_MAX,
            idleTimeoutMillis: IDLE_TIMEOUT_MS,
            connectionTimeoutMillis: CONNECTION_TIMEOUT_MS,
        });
    }

    return pools[key];
};


export const dbConnectionInitial = async (): Promise<Pool> => {

    const poolConfig: PoolConfig = {
        host: config.host,
        user: config.user,
        password: config.password,
        port: config.port,
        database: config.database,
        max: POOL_MAX,
        idleTimeoutMillis: IDLE_TIMEOUT_MS,
        connectionTimeoutMillis: CONNECTION_TIMEOUT_MS
    };

    return new Pool(poolConfig);
};


// Función para cerrar el pool
export const closeGlobalPool = async (): Promise<void> => {
    if (globalPool) {
        await globalPool.end();
        globalPool = null;
    }
};