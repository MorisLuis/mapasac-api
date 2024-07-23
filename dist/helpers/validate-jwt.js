"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Middleware to validate JWT from first login. (App)
const validateJWT = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            ok: false,
            message: 'Access denied. Token missing or invalid.',
        });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRETORPRIVATEKEY || '');
        req.idusrmob = decoded.idusrmob;
        next();
    }
    catch (err) {
        console.log({ err });
        return res.status(500).json({ success: false, message: 'Failed to authenticate token' });
    }
};
exports.validateJWT = validateJWT;
//# sourceMappingURL=validate-jwt.js.map