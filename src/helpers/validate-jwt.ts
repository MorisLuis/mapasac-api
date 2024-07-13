// helpers/validate-jwt.ts
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export interface Req extends Request {
    idusrmob?: number;
}

// Middleware to validate JWT from first login. (App)
const validateJWT = async (req: Req, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            ok: false,
            message: 'Access denied. Token missing or invalid.',
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRETORPRIVATEKEY || '') as { idusrmob: number };
        req.idusrmob = decoded.idusrmob;
        next();
    } catch (err) {
        console.log({ err });
        return res.status(500).json({ success: false, message: 'Failed to authenticate token' });
    }
};

export {
    validateJWT
}
