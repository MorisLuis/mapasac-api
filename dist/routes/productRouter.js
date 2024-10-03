"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = require("../controllers/product");
const validate_jwt_1 = require("../helpers/validate-jwt");
const productSells_1 = require("../controllers/productSells");
const productSellsRestaurant_1 = require("../controllers/productSellsRestaurant");
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
router.get('/sells', validate_jwt_1.validateJWT, productSells_1.getProductsSells);
router.get('/sells/total', validate_jwt_1.validateJWT, productSells_1.getTotalProductsSells);
router.get('/sells/totalclasses', validate_jwt_1.validateJWT, productSells_1.getTotalClassesSells);
router.get('/sells/byfamily', validate_jwt_1.validateJWT, productSells_1.getProductsSellsFromFamily);
router.get('/sells/units', validate_jwt_1.validateJWT, productSells_1.getUnits);
router.get('/sells/byenlacemob', validate_jwt_1.validateJWT, productSells_1.getProductByEnlacemob);
router.get('/sells/getidinvearts', validate_jwt_1.validateJWT, productSells_1.getIdinveartsProduct);
// Module 3 - Sells Restaurant
router.get('/sellsRestaurant', validate_jwt_1.validateJWT, productSellsRestaurant_1.getProductsSellsRestaurant);
router.get('/sellsRestaurant/byid', validate_jwt_1.validateJWT, productSellsRestaurant_1.getProductSellsRestaurantDetails);
router.get('/sellsRestaurant/total', validate_jwt_1.validateJWT, productSellsRestaurant_1.getTotalProductsSellsRestaurant);
exports.default = router;
//# sourceMappingURL=productRouter.js.map