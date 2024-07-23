"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDbConfig = void 0;
const querys_1 = require("../querys/querys");
const getDbConfig = async ({ idusrmob, poolInitial }) => {
    const client = await poolInitial.connect();
    try {
        const result = await client.query(querys_1.querys.getDbConfig, [idusrmob]);
        const { pasdba, usrdba, svr, dba, port } = result.rows[0];
        const dbConfigData = {
            user: usrdba,
            host: svr,
            database: dba,
            password: pasdba,
            port: port
        };
        if (result.rows.length > 0) {
            return dbConfigData;
        }
        throw new Error('Database configuration not found');
    }
    finally {
        client.release();
    }
};
exports.getDbConfig = getDbConfig;
//# sourceMappingURL=getDbConfig.js.map