import { Pool, PoolConfig } from 'pg';
import config from '../config';
import { getDbConfig } from '../utils/getDbConfig';
import NodeCache from 'node-cache';

// Initialize a cache with a TTL of 1 day and a check period of 10 minutes
const cache = new NodeCache({ stdTTL: 86400, checkperiod: 600 });

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
    const userConnection = idusrmob && database !== 'desarrollo'; // Checks if it's a user connection

    if (userConnection) {
        // Check if configuration is cached
        const cachedConfig = cache.get<PoolConfig>(`dbConfig_${idusrmob}`);
        if (cachedConfig) {
            // If `database` is specified, override the cached database value
            if (database) {
                poolConfig = { ...cachedConfig, database };
                return new Pool(poolConfig);
            } else {
                return new Pool(cachedConfig);
            }
        }

        // Create an initial pool to get configuration from `getDbConfig`
        //const poolInitial = database ? await dbConnectionInitial(database) : await dbConnectionInitial();
        const poolInitial = await dbConnectionInitial();
        const dbConfig = await getDbConfig({ idusrmob, poolInitial });

        // Cache the configuration if `database` is not specified
        if (!database) {
            cache.set(`dbConfig_${idusrmob}`, dbConfig);
        }

        poolConfig = {
            ...dbConfig,
            max: 10,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000
        };

        // Create and return a new Pool instance
        const pool = new Pool(poolConfig);
        console.log(pool ? 'Connected to the database!' : 'Error in connection!');
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
        database: database || config.database, // Use provided database or default one
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000
    };

    const pool = new Pool(poolConfig);
    console.log(pool ? 'Connected to the database initial!' : 'Error in connection to the database initial!');
    return pool;
};
