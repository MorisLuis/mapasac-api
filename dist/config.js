"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.default = {
    host: process.env.HOST || "5001",
    user: process.env.DB_USER || "",
    password: process.env.DB_PASSWORD || "",
    port: parseInt(process.env.DB_PORT) || 0,
    database: process.env.DB_DATABASE || ""
};
//# sourceMappingURL=config.js.map