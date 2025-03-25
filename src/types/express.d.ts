import { Request } from 'express';
import { UserSessionInterface } from '../interface/user';

declare global {
  namespace Express {
    interface Request {
      idusrmob?: number;
      sessionId: string;
      session: UserSessionInterface;
    }
  }
}
