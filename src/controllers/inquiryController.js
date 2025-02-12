import {
  createInquiryService,
  deleteInquiryService,
  getAllInquiriesService,
} from '../services/inquiryService.js';

export const createInquiryController = async (req, res) => {
  try {
    const result = await createInquiryService(req.body);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error creating document:', error);
    return res
      .status(500)
      .json({ error: error.message || 'Internal server error' });
  }
};

export const getAllInquiriesController = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const result = await getAllInquiriesService(page, limit);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching documents:', error);
    return res
      .status(500)
      .json({ error: error.message || 'Internal server error' });
  }
};

export const deleteInquiryController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteInquiryService(id);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error deleting document:', error);
    return res
      .status(500)
      .json({ error: error.message || 'Internal server error' });
  }
};
