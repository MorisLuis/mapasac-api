"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrorsBackend = exports.handleErrorsFrontend = void 0;
const connection_1 = require("../database/connection");
const utilsQuery_1 = require("../querys/utilsQuery");
const handleErrorsFrontend = async (req, res, next) => {
    const session = req.session;
    try {
        const pool = await (0, connection_1.dbConnectionInitial)();
        const { Message, Metodo } = req.body;
        const sendMessage = `${Metodo} / ${Message} / "${req.originalUrl}" / ${session.svr}`;
        await pool.query('BEGIN');
        await pool.query(utilsQuery_1.utilsQuery.insertErrorFrontend, [session.idusrmob, sendMessage]);
        await pool.query('COMMIT');
        res.json({ ok: true });
    }
    catch (error) {
        return next(error);
    }
};
exports.handleErrorsFrontend = handleErrorsFrontend;
const handleErrorsBackend = async (error) => {
    let pool = null;
    try {
        pool = await (0, connection_1.dbConnectionInitial)();
        const { Message, Id_Usuario, Metodo, path, svr, code } = error ?? {};
        // Formatear el mensaje de error
        const sendMessage = `${code}-${Metodo} / ${Message} / "${path}" / ${svr}`;
        await pool.query('BEGIN');
        await pool.query(utilsQuery_1.utilsQuery.insertErrorBackend, [Id_Usuario, sendMessage]);
        await pool.query('COMMIT');
        return;
    }
    catch (err) {
        if (pool)
            await pool.query('ROLLBACK');
        console.error('Error al guardar el error en la base de datos:', err);
    }
    finally {
        if (pool)
            await pool.end(); // Cerrar la conexión a la base de datos
    }
};
exports.handleErrorsBackend = handleErrorsBackend;
//# sourceMappingURL=errors.js.map