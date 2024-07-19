"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = require("../controllers/product");
const router = (0, express_1.Router)();
router.get('/', product_1.getProducts);
router.get('/total', product_1.getTotalProducts);
router.get('/byid', product_1.getProductById);
router.get('/byclave', product_1.getProductByClave);
router.get('/bycodebar', product_1.getProducByCodebar);
router.put('/:idinvearts', product_1.updateProduct);
router.put('/codebar/:idinvearts', product_1.updateProductCodebar);
exports.default = router;
//# sourceMappingURL=productRouter.js.map