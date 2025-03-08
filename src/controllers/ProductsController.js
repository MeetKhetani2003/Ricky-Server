import {
  createProductService,
  deleteProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductService,
} from '../services/ProductService.js';

export const createProductController = async (req, res) => {
  try {
    const detailImgs = req.files
      ? req.files.map((file) => file.path)
      : req.body.images;
    let { name, description, productDetails, category } = req.body;
    if (typeof productDetails === 'string') {
      try {
        productDetails = JSON.parse(productDetails);
      } catch (error) {
        return res.status(400).json({ error: 'Invalid productDetails format' });
      }
    }
    const data = {
      name,
      description,
      productDetails,
      category,
      productImgs: detailImgs,
    };
    const result = await createProductService(data);
    return res.status(201).json(result);
  } catch (error) {
    console.error('Error creating document:', error);
    return res
      .status(500)
      .json({ error: error.message || 'Internal server error' });
  }
};

export const updateProductController = async (req, res) => {
  try {
    console.log('Request body:', req.body);

    let detailImgs;
    const { id } = req.params;
    if (req.files || req.body.images) {
      detailImgs = req.files
        ? req.files.map((file) => file.path)
        : req.body.images;
      console.log('Uploaded files:', req.files);
    }

    let {
      name,
      description,
      productDetails,
      category,
      imagesToRemove,
      newImageUrls,
      imageUrl, // Handle legacy field if sent
    } = req.body;

    if (typeof productDetails === 'string') {
      try {
        productDetails = JSON.parse(productDetails);
      } catch (error) {
        console.error('Error parsing productDetails:', error);
        return res.status(400).json({ error: 'Invalid productDetails format' });
      }
    }

    let parsedImagesToRemove = [];
    if (imagesToRemove) {
      try {
        parsedImagesToRemove =
          typeof imagesToRemove === 'string'
            ? JSON.parse(imagesToRemove)
            : imagesToRemove;
      } catch (error) {
        console.error('Error parsing imagesToRemove:', error);
        parsedImagesToRemove = [];
      }
    } else if (imageUrl) {
      // Fallback for legacy immediate removal
      parsedImagesToRemove = [imageUrl];
    }

    const data = {
      name,
      description,
      productDetails,
      category,
      productImgs: detailImgs || [],
      imagesToRemove: parsedImagesToRemove,
      newImageUrls,
    };

    console.log('Data sending to service:', data);

    const result = await updateProductService(id, data);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error updating document:', error);
    return res
      .status(500)
      .json({ error: error.message || 'Internal server error' });
  }
};
export const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteProductService(id);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error deleting document:', error);
    return res
      .status(500)
      .json({ error: error.message || 'Internal server error' });
  }
};

export const getAllProductsController = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const result = await getAllProductsService(page, limit);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching documents:', error);
    return res
      .status(500)
      .json({ error: error.message || 'Internal server error' });
  }
};

export const getProductByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getProductByIdService(id);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching documents:', error);
    return res
      .status(500)
      .json({ error: error.message || 'Internal server error' });
  }
};
