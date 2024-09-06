"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const validate_jwt_1 = require("../helpers/validate-jwt");
const router = (0, express_1.Router)();
router.post('/login', auth_1.login);
router.get('/renew', validate_jwt_1.validateJWT, auth_1.renewLogin);
router.get('/logout', validate_jwt_1.validateJWT, auth_1.logout);
router.get('/modules', validate_jwt_1.validateJWT, auth_1.getModules);
exports.default = router;
//# sourceMappingURL=authRouter.js.map