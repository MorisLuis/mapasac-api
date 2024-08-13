"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnectionInitial = exports.dbConnection = void 0;
const pg_1 = require("pg");
const config_1 = __importDefault(require("../config"));
const getDbConfig_1 = require("../utils/getDbConfig");
const node_cache_1 = __importDefault(require("node-cache"));
// Initialize a cache with a TTL of 1 day and a check period of 10 minutes
const cache = new node_cache_1.default({ stdTTL: 86400, checkperiod: 600 });
// Constants for Pool configuration
const POOL_MAX = 10;
const IDLE_TIMEOUT_MS = 30000;
const CONNECTION_TIMEOUT_MS = 2000;
/**
 * Establishes a database connection.
 * If `idusrmob` is provided and `database` is not "desarrollo", attempts to use cached configuration.
 * If configuration is not cached, retrieves it using `getDbConfig` and stores it in the cache.
 *
 * @param {DbConnectionOptions} options - Options for database connection.
 */
const dbConnection = async ({ idusrmob, database }) => {
    let poolConfig;
    // Checks if it's a user connection, when i send 'desarollo' as database i force to go to the 'else'.
    const isUserConnection = idusrmob && database !== 'desarrollo';
    if (isUserConnection) {
        // Check if configuration is cached.
        const cachedConfig = cache.get(`dbConfig_${idusrmob}`);
        if (cachedConfig) {
            // This cache is only with the initial database. ( mapas server ).
            poolConfig = { ...cachedConfig, database: database || cachedConfig.database };
            return new pg_1.Pool(poolConfig);
        }
        // Create an initial pool to get configuration from `getDbConfig`.
        const poolInitial = await (0, exports.dbConnectionInitial)(); // ( mapas server ).
        const dbConfig = await (0, getDbConfig_1.getDbConfig)({ idusrmob, poolInitial });
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
        const pool = new pg_1.Pool(poolConfig);
        console.log(pool ? 'Connected to the database!' : 'Error connecting to the database!');
        return pool;
    }
    else {
        // Create a pool for the initial database connection
        return await (0, exports.dbConnectionInitial)();
    }
};
exports.dbConnection = dbConnection;
/**
 * Establishes an initial database connection with default configuration.
 * Used for obtaining the default configuration or for the first connection.
 *
 * @param {string} [database] - The name of the database to connect to.
 */
const dbConnectionInitial = async (database) => {
    const poolConfig = {
        host: config_1.default.host,
        user: config_1.default.user,
        password: config_1.default.password,
        port: config_1.default.port,
        database: database || config_1.default.database,
        max: POOL_MAX,
        idleTimeoutMillis: IDLE_TIMEOUT_MS,
        connectionTimeoutMillis: CONNECTION_TIMEOUT_MS
    };
    const pool = new pg_1.Pool(poolConfig);
    console.log(pool ? 'Connected to the initial database!' : 'Error connecting to the initial database!');
    return pool;
};
exports.dbConnectionInitial = dbConnectionInitial;
//# sourceMappingURL=connection.js.map