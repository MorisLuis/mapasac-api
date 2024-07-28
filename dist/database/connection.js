"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = exports.dbConnectionInitial = void 0;
const pg_1 = require("pg");
const config_1 = __importDefault(require("../config"));
const getDbConfig_1 = require("../utils/getDbConfig");
const node_cache_1 = __importDefault(require("node-cache"));
const cache = new node_cache_1.default({ stdTTL: 86400, checkperiod: 600 }); // TTL de 1 dia, checkperiod de 10 minutos
const dbConnectionInitial = async () => {
    let poolConfig;
    poolConfig = {
        host: config_1.default.host,
        user: config_1.default.user,
        password: config_1.default.password,
        port: config_1.default.port,
        database: config_1.default.database,
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000
    };
    const pool = new pg_1.Pool(poolConfig);
    console.log("Connected to the database initial!");
    return pool;
};
exports.dbConnectionInitial = dbConnectionInitial;
const dbConnection = async ({ idusrmob, database }) => {
    let poolConfig;
    console.log(`dbConnection idusrmob: ${idusrmob} and ${database}`);
    if (idusrmob) {
        // Verificar si la configuración de la base de datos está en el caché.
        const cachedConfig = cache.get(`dbConfig_${idusrmob}`);
        if (cachedConfig && database) {
            poolConfig = {
                ...cachedConfig,
                database
            };
            console.log("Using cached database configuration and new database");
            return new pg_1.Pool(poolConfig);
        }
        if (cachedConfig) {
            console.log("Using cached database configuration");
            return new pg_1.Pool(cachedConfig);
        }
        const poolInitial = await (0, exports.dbConnectionInitial)();
        const dbConfig = await (0, getDbConfig_1.getDbConfig)({ idusrmob, poolInitial });
        // Guardar la configuración en el caché.
        if (!database) {
            cache.set(`dbConfig_${idusrmob}`, dbConfig);
        }
        poolConfig = {
            ...dbConfig,
            max: 10,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000
        };
        console.log({ poolConfig });
        const pool = new pg_1.Pool(poolConfig);
        console.log("Connected to the database!");
        return pool;
    }
    else {
        const pool = await (0, exports.dbConnectionInitial)();
        return pool;
    }
};
exports.dbConnection = dbConnection;
//# sourceMappingURL=connection.js.map