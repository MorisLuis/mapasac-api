"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrorsBackend = exports.handleErrorsFrontend = void 0;
const connection_1 = require("../database/connection");
const utilsQuery_1 = require("../querys/utilsQuery");
const getSession_1 = require("../utils/Redis/getSession");
const handleErrorsFrontend = async (req, res) => {
    const sessionId = req.sessionID;
    const { user: userFR } = await (0, getSession_1.handleGetSession)({ sessionId });
    if (!userFR)
        return;
    try {
        const pool = await (0, connection_1.dbConnectionInitial)();
        const { Message, Metodo } = req.body;
        const sendMessage = `${Metodo} / ${Message} / "${req.originalUrl}" / ${userFR.svr}`;
        await pool.query('BEGIN');
        await pool.query(utilsQuery_1.utilsQuery.insertErrorFrontend, [userFR.idusrmob, sendMessage]);
        await pool.query('COMMIT');
        return res.json({ ok: true });
    }
    catch (error) {
        console.log({ error });
        return res.status(500).send(error.message);
    }
};
exports.handleErrorsFrontend = handleErrorsFrontend;
const handleErrorsBackend = async (error) => {
    let pool = null;
    try {
        pool = await (0, connection_1.dbConnectionInitial)();
        const { Message, Id_Usuario, Metodo, path, svr } = error ?? {};
        // Formatear el mensaje de error
        const sendMessage = `${Metodo} / ${Message} / "${path}" / ${svr}`;
        console.log({ sendMessage });
        await pool.query('BEGIN');
        await pool.query(utilsQuery_1.utilsQuery.insertErrorBackend, [Id_Usuario, sendMessage]);
        await pool.query('COMMIT');
    }
    catch (err) {
        if (pool) {
            await pool.query('ROLLBACK');
        }
        console.error('Error al guardar el error en la base de datos:', err);
    }
    finally {
        if (pool) {
            pool.end(); // Cerrar la conexión a la base de datos
        }
    }
};
exports.handleErrorsBackend = handleErrorsBackend;
exports.default = handleErrorsBackend;
//# sourceMappingURL=errors.js.map