import express from 'express';
import { catchErrors } from '../handlers/error';
import {
  ADD_PRODUCT_ROUTE,
  GET_PRODUCT_ROUTE,
  GET_CATALOG_PRODUCTS_ROUTE,
  UPDATE_PRODUCT_ROUTE,
} from '../constants';
import {
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

export default router;
