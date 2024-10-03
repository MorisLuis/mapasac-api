"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrors = void 0;
const connection_1 = require("../database/connection");
const handleErrors = async (req, res) => {
    try {
        const pool = await (0, connection_1.dbConnectionInitial)();
        const { From, Message, Id_Usuario, Metodo, code } = req.body;
        await pool.query('BEGIN');
        //await pool.query(querys.postError, [From, Message, Id_Usuario, Metodo, code]);
        await pool.query('COMMIT');
        return res.json({
            ok: true
        });
    }
    catch (error) {
        console.log({ error });
        return res.status(500).send(error.message);
    }
};
exports.handleErrors = handleErrors;
//# sourceMappingURL=errors.js.map