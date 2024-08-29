"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const search_1 = require("../controllers/search");
const validate_jwt_1 = require("../helpers/validate-jwt");
const router = (0, express_1.Router)();
router.get('/product', validate_jwt_1.validateJWT, search_1.searchProduct);
router.get('/productInBag', validate_jwt_1.validateJWT, search_1.searchProductInBag);
router.get('/clients', validate_jwt_1.validateJWT, search_1.searchClients);
exports.default = router;
//# sourceMappingURL=searchRouter.js.map