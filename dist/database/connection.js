"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeGlobalPool = exports.dbConnectionInitial = exports.dbConnection = void 0;
const pg_1 = require("pg");
const config_1 = __importDefault(require("../config"));
const POOL_MAX = 50;
const IDLE_TIMEOUT_MS = 30000;
const CONNECTION_TIMEOUT_MS = 10000;
let globalPool = null;
const pools = {}; // Cache de pools
const dbConnection = (config) => {
    const key = `${config.host}_${config.database}_${config.user}`;
    if (!pools[key]) {
        pools[key] = new pg_1.Pool({
            ...config,
            max: POOL_MAX,
            idleTimeoutMillis: IDLE_TIMEOUT_MS,
            connectionTimeoutMillis: CONNECTION_TIMEOUT_MS,
        });
    }
    return pools[key];
};
exports.dbConnection = dbConnection;
const dbConnectionInitial = async () => {
    const poolConfig = {
        host: config_1.default.host,
        user: config_1.default.user,
        password: config_1.default.password,
        port: config_1.default.port,
        database: config_1.default.database,
        max: POOL_MAX,
        idleTimeoutMillis: IDLE_TIMEOUT_MS,
        connectionTimeoutMillis: CONNECTION_TIMEOUT_MS
    };
    return await new pg_1.Pool(poolConfig);
};
exports.dbConnectionInitial = dbConnectionInitial;
// Función para cerrar el pool
const closeGlobalPool = async () => {
    if (globalPool) {
        await globalPool.end();
        globalPool = null;
    }
};
exports.closeGlobalPool = closeGlobalPool;
//# sourceMappingURL=connection.js.map