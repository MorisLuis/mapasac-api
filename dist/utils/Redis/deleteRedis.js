"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDeleteRedisSession = void 0;
const redisClient_1 = __importDefault(require("../../config/redisClient"));
const handleDeleteRedisSession = async ({ sessionId }) => {
    await redisClient_1.default?.del(`sess:${sessionId}`, (err, response) => {
        if (err) {
            console.error('Error al eliminar la sesión:', err);
        }
        else {
            if (response === 1) {
                console.log('Sesión eliminada exitosamente');
            }
            else {
                console.log('Sesión no encontrada en Redis');
            }
        }
    });
};
exports.handleDeleteRedisSession = handleDeleteRedisSession;
//# sourceMappingURL=deleteRedis.js.map