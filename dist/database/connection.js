"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const pg_1 = require("pg");
const clientConfig = {
    host: "127.0.0.1",
    user: "morado",
    password: "adiosamor2",
    port: 5432,
    database: 'mapasac'
};
let client = null;
const dbConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!client) {
        client = new pg_1.Client(clientConfig);
        try {
            yield client.connect();
            console.log("Connected to the database!");
        }
        catch (err) {
            console.error('Error connecting to the database:', err);
            client = null;
        }
    }
    return client;
});
exports.dbConnection = dbConnection;
//# sourceMappingURL=connection.js.map