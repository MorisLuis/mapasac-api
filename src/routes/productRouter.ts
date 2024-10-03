import { Router } from "express";
import { getProducByCodebar, getProductByClave, getProductById, getProductByNoArticulo, getProducts, getTotalProducts, updateProduct, updateProductCodebar } from "../controllers/product";
import { validateJWT } from "../helpers/validate-jwt";
import { getIdinveartsProduct, getProductByEnlacemob, getProductsSells, getProductsSellsFromFamily, getTotalClassesSells, getTotalProductsSells, getUnits } from "../controllers/productSells";
import { getProductSellsRestaurantDetails, getProductsSellsRestaurant, getTotalProductsSellsRestaurant } from "../controllers/productSellsRestaurant";

const router = Router();

// Module 1 - Inventory
router.get('/', validateJWT, getProducts);
router.get('/total', validateJWT, getTotalProducts);
router.get('/byid', validateJWT, getProductById);
router.get('/byclave', validateJWT, getProductByClave);
router.get('/bynoarticulo', validateJWT, getProductByNoArticulo);
router.get('/bycodebar', validateJWT, getProducByCodebar);
router.put('/:idinvearts', validateJWT, updateProduct);
router.put('/codebar/:idinvearts', validateJWT, updateProductCodebar);

// Module 2 - Sells
router.get('/sells', validateJWT, getProductsSells);
router.get('/sells/total', validateJWT, getTotalProductsSells);
router.get('/sells/totalclasses', validateJWT, getTotalClassesSells);
router.get('/sells/byfamily', validateJWT, getProductsSellsFromFamily);
router.get('/sells/units', validateJWT, getUnits);
router.get('/sells/byenlacemob', validateJWT, getProductByEnlacemob);
router.get('/sells/getidinvearts', validateJWT, getIdinveartsProduct);

// Module 3 - Sells Restaurant
router.get('/sellsRestaurant', validateJWT, getProductsSellsRestaurant);
router.get('/sellsRestaurant/byid', validateJWT, getProductSellsRestaurantDetails);
router.get('/sellsRestaurant/total', validateJWT, getTotalProductsSellsRestaurant);


export default router;