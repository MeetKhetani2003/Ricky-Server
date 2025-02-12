import {
  createCategoryController,
  deleteCategoryController,
  getAllCategoriesController,
  getCategoryByIdController,
  getProductsByCategoryController,
  updateCategoryController,
} from '../../controllers/CategoryController.js';
import express from 'express';

import upload from '../../middlewares/upload.js';

const router = express.Router();

router.post('/', upload.single('img'), createCategoryController);
router.get('/', getAllCategoriesController);
router.get('/category', getProductsByCategoryController);
router.put('/:id', upload.single('img'), updateCategoryController);
router.get('/:id', getCategoryByIdController);
router.delete('/:id', deleteCategoryController);

export default router;
