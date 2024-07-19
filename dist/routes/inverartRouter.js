"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_jwt_1 = require("../helpers/validate-jwt");
const inveart_1 = require("../controllers/inveart");
const router = (0, express_1.Router)();
router.post('/inventory', validate_jwt_1.validateJWT, inveart_1.postInventory);
router.post('/sell', validate_jwt_1.validateJWT, inveart_1.postSell);
exports.default = router;
//# sourceMappingURL=inverartRouter.js.map