/// <reference path="./types/express.d.ts" />

import dotenv from "dotenv";
import Server from "./models/server";


dotenv.config();

const server = new Server();
server.listen();

export default server;
