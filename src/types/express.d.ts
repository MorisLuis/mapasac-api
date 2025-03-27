// src/types/express.d.ts
import { UserSessionInterface } from '../interface/user';
import { Request } from 'express';

declare global {
    namespace Express {
        interface Request {
            idusrmob: number;
            sessionId: string;
            session: UserSessionInterface;
        }
    }
}

export { };
