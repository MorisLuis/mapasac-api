"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModules = exports.renewLogin = exports.login = void 0;
const connection_1 = require("../database/connection");
const querys_1 = require("../querys/querys");
const generate_jwt_1 = require("../helpers/generate-jwt");
const login = async (req, res) => {
    const pool = await (0, connection_1.dbConnection)({});
    if (!pool) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
        return;
    }
    ;
    const client = await pool.connect();
    if (!client) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
        return;
    }
    try {
        const { usr, pas } = req.body;
        if (usr.trim() === "" || pas.trim() === "") {
            return res.status(400).json({ error: 'Necesario escribir usuario y contraseña' });
        }
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
    finally {
        client.release();
    }
};
exports.login = login;
const renewLogin = async (req, res) => {
    const idusrmob = req.idusrmob;
    console.log({ idusrmob });
    if (!idusrmob) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
        return;
    }
    ;
    const pool = await (0, connection_1.dbConnection)({ idusrmob, database: 'desarrollo' });
    const client = await pool.connect();
    if (!client) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
        return;
    }
    console.log("pass connection renew");
    try {
        const result = await pool.query(querys_1.querys.getUserById, [idusrmob]);
        console.log({ result });
        const user = result.rows[0];
        const token = await (0, generate_jwt_1.generateJWT)({
            idusrmob: idusrmob,
        });
        console.log({ tokenRENEW: token });
        res.json({
            user,
            token
        });
    }
    catch (error) {
        console.log({ error });
        res.status(500).send(error.message);
    }
    finally {
        client.release();
    }
};
exports.renewLogin = renewLogin;
const getModules = async (req, res) => {
    const idusrmob = req.idusrmob;
    if (!idusrmob) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con el usuario' });
        return;
    }
    ;
    const pool = await (0, connection_1.dbConnectionInitial)();
    const client = await pool.connect();
    if (!client) {
        res.status(500).json({ error: 'No se pudo establecer la conexión con la base de datos' });
        return;
    }
    try {
        const result = await pool.query(querys_1.querys.getModules, [idusrmob]);
        const modules = result.rows;
        res.json({
            modules
        });
    }
    catch (error) {
        console.log({ error });
        res.status(500).send(error.message);
    }
    finally {
        client.release();
    }
};
exports.getModules = getModules;
//# sourceMappingURL=auth.js.map