import { Pool, PoolConfig } from "pg";
import { querys } from "../querys/querys";

interface getDbConfigInterface {
    idusrmob: number;
    poolInitial: Pool
}

export const getDbConfig = async ({ idusrmob, poolInitial }: getDbConfigInterface): Promise<PoolConfig> => {

    //Always has to go to "grupomac" and "database".
    const client = await poolInitial.connect();

    try {
        const result = await client.query(querys.getDbConfig, [idusrmob]);
        const { pasdba, usrdba, svr, dba, port } = result.rows[0]
        const dbConfigData = {
            user: usrdba,
            host: svr,
            database: dba,
            password: pasdba,
            port: port
        }

        if (result.rows.length > 0) {
            return dbConfigData;
        }

        throw new Error('Database configuration not found');
    } finally {
        client.release();
    }
};
