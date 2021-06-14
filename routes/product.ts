import express from 'express';
import { catchErrors } from '../handlers/error';
import {
  SEARCH_PRODUCTS_ROUTE,
  ADD_PRODUCT_ROUTE,
  GET_PRODUCT_ROUTE,
  GET_CATALOG_PRODUCTS_ROUTE,
  UPDATE_PRODUCT_ROUTE,
} from '../constants';
import {
  findProducts,
  addProduct,
  getProduct,
  getProductsForCatalog,
  updateProduct,
} from '../controllers/product';

const router = express.Router();

router.post(ADD_PRODUCT_ROUTE, catchErrors(addProduct));
router.put(UPDATE_PRODUCT_ROUTE, catchErrors(updateProduct));
router.get(GET_PRODUCT_ROUTE, catchErrors(getProduct));
router.get(GET_CATALOG_PRODUCTS_ROUTE, catchErrors(getProductsForCatalog));
router.post(SEARCH_PRODUCTS_ROUTE, catchErrors(findProducts));
export default router;
