"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrorsBackend = exports.handleErrorsFrontend = void 0;
const connection_1 = require("../database/connection");
const utilsQuery_1 = require("../querys/utilsQuery");
const handleErrorsFrontend = async (req, res) => {
    try {
        const pool = await (0, connection_1.dbConnectionInitial)();
        const { Message, Id_Usuario, Metodo, code, From } = req.body;
        const sendMessage = `${code} / ${From} / ${Metodo} / ${Message}`;
        await pool.query('BEGIN');
        await pool.query(utilsQuery_1.utilsQuery.insertErrorFrontend, [Id_Usuario, sendMessage]);
        await pool.query('COMMIT');
        return res.json({ ok: true });
    }
    catch (error) {
        console.log({ error });
        return res.status(500).send(error.message);
    }
};
exports.handleErrorsFrontend = handleErrorsFrontend;
const handleErrorsBackend = async (req, res) => {
    try {
        const pool = await (0, connection_1.dbConnectionInitial)();
        const { Message, Id_Usuario, Metodo, code, From } = req.body;
        const sendMessage = `${code} / ${From} / ${Metodo} / ${Message}`;
        await pool.query('BEGIN');
        await pool.query(utilsQuery_1.utilsQuery.insertErrorBackend, [Id_Usuario, sendMessage]);
        await pool.query('COMMIT');
        return res.json({ ok: true });
    }
    catch (error) {
        console.log({ error });
        return res.status(500).send(error.message);
    }
    ;
};
exports.handleErrorsBackend = handleErrorsBackend;
//# sourceMappingURL=errors.js.map