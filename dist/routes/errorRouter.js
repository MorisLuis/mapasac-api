"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const errors_1 = require("../controllers/errors");
const router = (0, express_1.Router)();
router.post('/front', errors_1.handleErrorsFrontend);
router.post('/back', errors_1.handleErrorsBackend);
exports.default = router;
//# sourceMappingURL=errorRouter.js.map