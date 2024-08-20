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
const cache = new node_cache_1.default({ stdTTL: 86400, checkperiod: 600 });
const POOL_MAX = 50;
const IDLE_TIMEOUT_MS = 30000;
const CONNECTION_TIMEOUT_MS = 5000;
// Map para almacenar pools por combinación de `idusrmob` y `database`
const pools = new Map();
const dbConnection = async ({ idusrmob, database }) => {
    const key = `${idusrmob || 'default'}_${database || 'default'}`;
    if (pools.has(key)) {
        return pools.get(key);
    }
    let poolConfig;
    const isUserConnection = idusrmob && database !== 'desarrollo';
    if (isUserConnection) {
        const cachedConfig = cache.get(`dbConfig_${idusrmob}`);
        if (cachedConfig) {
            poolConfig = { ...cachedConfig, database: database || cachedConfig.database };
        }
        else {
            const poolInitial = await (0, exports.dbConnectionInitial)();
            const dbConfig = await (0, getDbConfig_1.getDbConfig)({ idusrmob, poolInitial });
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
    }
    else {
        poolConfig = {
            host: config_1.default.host,
            user: config_1.default.user,
            password: config_1.default.password,
            port: config_1.default.port,
            database: database || config_1.default.database,
            max: POOL_MAX,
            idleTimeoutMillis: IDLE_TIMEOUT_MS,
            connectionTimeoutMillis: CONNECTION_TIMEOUT_MS
        };
    }
    const pool = new pg_1.Pool(poolConfig);
    pools.set(key, pool);
    return pool;
};
exports.dbConnection = dbConnection;
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
    return new pg_1.Pool(poolConfig);
};
exports.dbConnectionInitial = dbConnectionInitial;
//# sourceMappingURL=connection.js.map