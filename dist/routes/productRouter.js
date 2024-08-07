"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = require("../controllers/product");
const validate_jwt_1 = require("../helpers/validate-jwt");
const router = (0, express_1.Router)();
// Module 1 - Inventory
router.get('/', validate_jwt_1.validateJWT, product_1.getProducts);
router.get('/total', validate_jwt_1.validateJWT, product_1.getTotalProducts);
router.get('/byid', validate_jwt_1.validateJWT, product_1.getProductById);
router.get('/byclave', validate_jwt_1.validateJWT, product_1.getProductByClave);
router.get('/bynoarticulo', validate_jwt_1.validateJWT, product_1.getProductByNoArticulo);
router.get('/bycodebar', validate_jwt_1.validateJWT, product_1.getProducByCodebar);
router.put('/:idinvearts', validate_jwt_1.validateJWT, product_1.updateProduct);
router.put('/codebar/:idinvearts', validate_jwt_1.validateJWT, product_1.updateProductCodebar);
// Module 2 - Sells
router.get('/sells', validate_jwt_1.validateJWT, product_1.getProductsSells);
router.get('/sells/total', validate_jwt_1.validateJWT, product_1.getTotalProductsSells);
router.get('/sells/byfamily', validate_jwt_1.validateJWT, product_1.getProductsSellsFromFamily);
router.get('/sells/units', validate_jwt_1.validateJWT, product_1.getUnits);
router.get('/sells/byenlacemob', validate_jwt_1.validateJWT, product_1.getProductByEnlacemob);
exports.default = router;
//# sourceMappingURL=productRouter.js.map