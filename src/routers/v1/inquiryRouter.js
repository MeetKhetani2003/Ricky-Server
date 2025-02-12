import {
  createInquiryController,
  deleteInquiryController,
  getAllInquiriesController,
} from '../../controllers/inquiryController.js';
import express from 'express';

const app = express.Router();

app.post('/', createInquiryController);
app.get('/', getAllInquiriesController);
app.delete('/:id', deleteInquiryController);

export default app;
