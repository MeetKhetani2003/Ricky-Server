import express from 'express';

import categoryRouter from './categoryRouter.js';
import inquiryRouter from './inquiryRouter.js';
import productRouter from './productRouter.js';

const router = express.Router();
router.use('/products', productRouter);
router.use('/inquiries', inquiryRouter);
router.use('/categories', categoryRouter);
export default router;
