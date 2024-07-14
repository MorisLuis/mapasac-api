"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renewLogin = exports.login = void 0;
const connection_1 = require("../database/connection");
const querys_1 = require("../querys/querys");
const generate_jwt_1 = require("../helpers/generate-jwt");
const login = async (req, res) => {
    try {
        const pool = await (0, connection_1.dbConnection)();
        if (!pool) {
            res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
            return;
        }
        const { usr, pas } = req.body;
        const userName = usr.toUpperCase();
        const result = await pool.query(querys_1.querys.auth, [userName]);
        const user = result.rows[0];
        if (!user) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }
        if (user.pas.trim() !== pas) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }
        const token = await (0, generate_jwt_1.generateJWT)({
            idusrmob: user.idusrmob,
        });
        res.json({
            user,
            token
        });
    }
    catch (error) {
        console.log({ error });
        return res.status(500).json({ error: error.message || 'Unexpected error' });
    }
};
exports.login = login;
const renewLogin = async (req, res) => {
    const idusrmob = req.idusrmob;
    try {
        const pool = await (0, connection_1.dbConnection)();
        if (!pool) {
            res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
            return;
        }
        const result = await pool.query(querys_1.querys.getUserById, [idusrmob]);
        const user = result.rows[0];
        res.json({
            ok: true,
            user
        });
    }
    catch (error) {
        console.log({ error });
        res.status(500).send(error.message);
    }
};
exports.renewLogin = renewLogin;
//# sourceMappingURL=auth.js.map