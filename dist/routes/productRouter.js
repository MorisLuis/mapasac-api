"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = require("../controllers/product");
const validate_jwt_1 = require("../helpers/validate-jwt");
const router = (0, express_1.Router)();
router.get('/', validate_jwt_1.validateJWT, product_1.getProducts);
router.get('/total', validate_jwt_1.validateJWT, product_1.getTotalProducts);
router.get('/byid', validate_jwt_1.validateJWT, product_1.getProductById);
router.get('/byclave', validate_jwt_1.validateJWT, product_1.getProductByClave);
router.get('/bycodebar', validate_jwt_1.validateJWT, product_1.getProducByCodebar);
router.put('/:idinvearts', validate_jwt_1.validateJWT, product_1.updateProduct);
router.put('/codebar/:idinvearts', validate_jwt_1.validateJWT, product_1.updateProductCodebar);
exports.default = router;
//# sourceMappingURL=productRouter.js.map