import { Pool, PoolConfig } from 'pg';
import config from '../config';
import { getDbConfig } from '../utils/getDbConfig';
import NodeCache from 'node-cache';

// Initialize a cache with a TTL of 1 day and a check period of 10 minutes
const cache = new NodeCache({ stdTTL: 86400, checkperiod: 600 });

// Constants for Pool configuration
const POOL_MAX = 10;
const IDLE_TIMEOUT_MS = 30000;
const CONNECTION_TIMEOUT_MS = 2000;

// Interface for database connection options
interface DbConnectionOptions {
    idusrmob?: number;
    database?: string; // Specifies which database to connect to
}

/**
 * Establishes a database connection.
 * If `idusrmob` is provided and `database` is not "desarrollo", attempts to use cached configuration.
 * If configuration is not cached, retrieves it using `getDbConfig` and stores it in the cache.
 *
 * @param {DbConnectionOptions} options - Options for database connection.
 */

export const dbConnection = async ({ idusrmob, database }: DbConnectionOptions): Promise<Pool> => {
    let poolConfig: PoolConfig;
    // Checks if it's a user connection, when i send 'desarollo' as database i force to go to the 'else'.
    const isUserConnection = idusrmob && database !== 'desarrollo'; 

    if (isUserConnection) {

        // Check if configuration is cached.
        const cachedConfig = cache.get<PoolConfig>(`dbConfig_${idusrmob}`);
        if (cachedConfig) {
            // This cache is only with the initial database. ( mapas server ).
            poolConfig = { ...cachedConfig, database: database || cachedConfig.database };
            return new Pool(poolConfig);
        }

        // Create an initial pool to get configuration from `getDbConfig`.
        const poolInitial = await dbConnectionInitial(); // ( mapas server ).
        const dbConfig = await getDbConfig({ idusrmob, poolInitial });

        // Cache the configuration if `database` is not specified.
        if (!database) {
            // Create cache to the initial database. ( mapas server ).
            cache.set(`dbConfig_${idusrmob}`, dbConfig);
        }

        poolConfig = {
            ...dbConfig,
            database: database || dbConfig.database, // Use provided database or default one
            max: 10,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000
        };

        const pool = new Pool(poolConfig);
        console.log(pool ? 'Connected to the database!' : 'Error connecting to the database!');
        return pool;
    } else {
        // Create a pool for the initial database connection
        return await dbConnectionInitial();
    }
};

/**
 * Establishes an initial database connection with default configuration.
 * Used for obtaining the default configuration or for the first connection.
 *
 * @param {string} [database] - The name of the database to connect to.
 */

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

    const pool = new Pool(poolConfig);
    console.log(pool ? 'Connected to the initial database!' : 'Error connecting to the initial database!');
    return pool;
};
