"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_jwt_1 = require("../helpers/validate-jwt");
const bag_1 = require("../controllers/bag");
const router = (0, express_1.Router)();
router.get('/', validate_jwt_1.validateJWT, bag_1.getBag);
router.post('/', validate_jwt_1.validateJWT, bag_1.insertPoductToBag);
router.put('/', validate_jwt_1.validateJWT, bag_1.updateProductFromBag);
router.delete('/all', validate_jwt_1.validateJWT, bag_1.deleteAllProductsInBag);
router.delete('/:idenlacemob', validate_jwt_1.validateJWT, bag_1.deleteProductFromBag);
router.get('/total', validate_jwt_1.validateJWT, bag_1.getTotalProductsInBag);
router.get('/price', validate_jwt_1.validateJWT, bag_1.getTotalPriceBag);
exports.default = router;
//# sourceMappingURL=bagRouter.js.map