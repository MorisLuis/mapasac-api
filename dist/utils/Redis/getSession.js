"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGetSession = void 0;
const server_1 = require("../../models/server");
const handleGetSession = async ({ sessionId }) => {
    try {
        const sessionData = await server_1.redisClient?.get(`sess:${sessionId}`);
        const session = JSON.parse(sessionData);
        const user = session.user;
        return { user };
    }
    catch (error) {
        console.log({ error });
        return { user: undefined };
    }
};
exports.handleGetSession = handleGetSession;
//# sourceMappingURL=getSession.js.map