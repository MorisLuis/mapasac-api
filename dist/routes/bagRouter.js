"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_jwt_1 = require("../helpers/validate-jwt");
const bag_1 = require("../controllers/bag");
const router = (0, express_1.Router)();
router.get('/', validate_jwt_1.validateJWT, bag_1.getBag);
router.post('/', validate_jwt_1.validateJWT, bag_1.inserPoductToBag);
router.put('/', validate_jwt_1.validateJWT, bag_1.updatePoductFromBag);
router.delete('/', validate_jwt_1.validateJWT, bag_1.deletePoductFromBag);
exports.default = router;
//# sourceMappingURL=bagRouter.js.map