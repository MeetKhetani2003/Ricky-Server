import {
  createProductController,
  deleteProductController,
  getAllProductsController,
  getProductByIdController,
  updateProductController,
} from '../../controllers/ProductsController.js';
import express from 'express';

import upload from '../../middlewares/upload.js';

const router = express.Router();

router.post('/', upload.array('images'), createProductController);
router.get('/', getAllProductsController);
router.get('/:id', getProductByIdController);
router.put('/:id', upload.array('images'), updateProductController);
router.delete('/:id', deleteProductController);
export default router;
