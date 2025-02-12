import {
  createCategoryService,
  deleteCategoryService,
  getAllCategoriesService,
  getCategoryByIdService,
  getProductsByCategoryService,
  updateCategoryService,
} from '../services/CategoryService.js';

export const createCategoryController = async (req, res) => {
  try {
    console.log('Received Body:', req.body);
    console.log('Received File:', req.file);

    const img = req.file.path;
    const data = { ...req.body, img };
    const result = await createCategoryService(data);
    return res.status(201).json(result);
  } catch (error) {
    console.error('Error creating document:', error);
    return res
      .status(500)
      .json({ error: error.message || 'Internal server error' });
  }
};

export const getAllCategoriesController = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const result = await getAllCategoriesService(page, limit);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching documents:', error);
    return res
      .status(500)
      .json({ error: error.message || 'Internal server error' });
  }
};

export const getProductsByCategoryController = async (req, res) => {
  try {
    const { page = 0, limit = 10, category } = req.query;
    const result = await getProductsByCategoryService(category, page, limit);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching documents:', error);
    return res
      .status(500)
      .json({ error: error.message || 'Internal server error' });
  }
};
export const getCategoryByIdController = async (req, res) => {
  try {
    console.log(req.params.id);

    const { id } = req.params;
    const result = await getCategoryByIdService(id);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching documents:', error);
    return res
      .status(500)
      .json({ error: error.message || 'Internal server error' });
  }
};
export const updateCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const data = {};

    // Check if an image file is provided
    if (req.file) {
      data.img = req.file.path; // Only update the image if a new one is provided
    }

    // Check if there are any fields in req.body to update
    if (Object.keys(req.body).length > 0) {
      // Merge req.body into data, excluding the img field if it's already set
      Object.keys(req.body).forEach((key) => {
        if (key !== 'img') {
          data[key] = req.body[key];
        }
      });
    }

    // Log the data to be updated
    console.log('Data to be updated:', data);

    // Call the update service with the id and the constructed data
    const result = await updateCategoryService(id, data);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error updating document:', error);
    return res
      .status(500)
      .json({ error: error.message || 'Internal server error' });
  }
};
export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteCategoryService(id);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error deleting document:', error);
    return res
      .status(500)
      .json({ error: error.message || 'Internal server error' });
  }
};
