"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const codebar_1 = require("../controllers/codebar");
const router = (0, express_1.Router)();
router.put('/', codebar_1.updateProductCodebar);
exports.default = router;
//# sourceMappingURL=codebarRouter.js.map