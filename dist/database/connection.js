"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const pg_1 = require("pg");
const config_1 = __importDefault(require("../config"));
const poolConfig = {
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
const dbConnection = async () => {
    console.log("Connected to the database!");
    return pool;
};
exports.dbConnection = dbConnection;
//# sourceMappingURL=connection.js.map