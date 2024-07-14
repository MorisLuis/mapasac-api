"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inveart_1 = require("../controllers/inveart");
const router = (0, express_1.Router)();
router.post('/', inveart_1.insertInventoryDetails);
exports.default = router;
//# sourceMappingURL=inverartRouter.js.map