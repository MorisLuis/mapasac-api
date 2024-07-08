import { Client, ClientConfig } from "pg";

const clientConfig: ClientConfig = {
    host: "grupomac.dyndns.tv",
    user: "postgres",
    password: "Master55",
    port: 5432,
    database: "desarrollo"
};

let client: Client | null = null;

export const dbConnection = async () => {
    if (!client) {
        client = new Client(clientConfig);
        console.log({client})
        try {
            const pool = await client.connect();
            console.log({pool})
            console.log("Connected to the database!");
        } catch (err) {
            console.error('Error connecting to the database:', err);
            client = null;
        }
    }
    return client;
}