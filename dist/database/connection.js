"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const pg_1 = require("pg");
const config_1 = __importDefault(require("../config"));
let client = null;
const dbConnection = async () => {
    const dbConfig = {
        host: config_1.default.host,
        user: config_1.default.user,
        password: config_1.default.password,
        port: config_1.default.port,
        database: config_1.default.database
    };
    if (!client) {
        client = new pg_1.Client(dbConfig);
        try {
            await client.connect();
            console.log("Connected to the database!");
        }
        catch (err) {
            console.error('Error connecting to the database:', err);
            client = null;
        }
    }
    return client;
};
exports.dbConnection = dbConnection;
//# sourceMappingURL=connection.js.map