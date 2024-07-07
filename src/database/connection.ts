import { Client, ClientConfig } from "pg";

const clientConfig: ClientConfig = {
    host: "127.0.0.1",
    user: "morado",
    password: "adiosamor2",
    port: 5434,
    database: 'mapasac'
};

let client: Client | null = null;

export const dbConnection = async () => {
    if (!client) {
        client = new Client(clientConfig);
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