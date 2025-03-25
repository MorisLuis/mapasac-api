import redisClient from "../../config/redisClient";
import { UserSessionInterface } from "../../interface/user";

interface handleGetSessionInterface {
    sessionId?: string;
}

export const handleGetSession = async ({ sessionId }: handleGetSessionInterface): Promise<{ user: UserSessionInterface | undefined }> => {
    try {
        const sessionData = await redisClient?.get(`sess:${sessionId}`);
        const session = JSON.parse(sessionData as string);
        const user: UserSessionInterface = session.user;
        return { user };
    } catch (error) {
        console.error("Error en handleGetSession:", error); // <- Ahora el error se usa
        return { user: undefined };
    }
};
