"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGetSession = void 0;
const redisClient_1 = __importDefault(require("../../config/redisClient"));
const handleGetSession = async ({ sessionId }) => {
    try {
        const sessionData = await redisClient_1.default?.get(`sess:${sessionId}`);
        const session = JSON.parse(sessionData);
        const user = session.user;
        return { user };
    }
    catch (error) {
        console.error("Error en handleGetSession:", error); // <- Ahora el error se usa
        return { user: undefined };
    }
};
exports.handleGetSession = handleGetSession;
//# sourceMappingURL=getSession.js.map