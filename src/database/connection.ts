import { Pool, PoolConfig } from 'pg';
import config from '../config';
import ConnectionInterface from '../interface/connection';

const POOL_MAX = 50;
const IDLE_TIMEOUT_MS = 30000;
const CONNECTION_TIMEOUT_MS = 10000;

let globalPool: Pool | null = null;

export const dbConnection = async ({ database }: { database?: ConnectionInterface }): Promise<Pool> => {

    const { svr, dba, port, usrdba, pasdba } = database ?? {};

    const poolConfig: PoolConfig = {
        host: svr || config.host,
        user: usrdba || config.user,
        password: pasdba || config.password,
        port: port || config.port,
        database: dba || database?.dba || config.database,

        max: POOL_MAX,
        idleTimeoutMillis: IDLE_TIMEOUT_MS,
        connectionTimeoutMillis: CONNECTION_TIMEOUT_MS
    };

    globalPool = new Pool(poolConfig);
    return globalPool;
};

export const getGlobalPool = (connection?: ConnectionInterface): Pool => {

    if (!globalPool) {
        dbConnection({database: connection});
    }

    if (!globalPool) {
        throw new Error('Global pool not initialized');
    }

    return globalPool;
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