import { config } from "dotenv";

config();

export default {
    host: process.env.HOST || "5001",
    user: process.env.DB_USER || "",
    password: process.env.DB_PASSWORD || "",
    port: parseInt(process.env.DB_PORT as string) || 0,
    database: process.env.DB_DATABASE || ""
};