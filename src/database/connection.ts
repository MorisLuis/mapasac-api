import { Client, ClientConfig } from "pg";
import config from "../config";

let client: Client | null = null;

export const dbConnection = async () => {

    const dbConfig : ClientConfig = {
        host: config.host,
        user: config.user,
        password: config.password,
        port: config.port,
        database: config.database
    };
    if (!client) {
        client = new Client(dbConfig);
        try {
            await client.connect();
            console.log("Connected to the database!");
        } catch (err) {
            console.error('Error connecting to the database:', err);
            client = null;
        }
    }
    return client;
}