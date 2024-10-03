"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_jwt_1 = require("../helpers/validate-jwt");
const utils_1 = require("../controllers/utils");
const router = (0, express_1.Router)();
router.get('/address', validate_jwt_1.validateJWT, utils_1.getAddressDirection);
router.get('/paymentType', validate_jwt_1.validateJWT, utils_1.getPaymentType);
router.get('/clients', validate_jwt_1.validateJWT, utils_1.getClients);
router.get('/modules', validate_jwt_1.validateJWT, utils_1.getModules);
exports.default = router;
//# sourceMappingURL=utilsRouter.js.map