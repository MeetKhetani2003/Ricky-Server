import {
  removeImgFromCloudinary,
  removeImgsArrayFromCloudinary,
} from '../middlewares/upload.js';
import { categoryRepository } from '../repository/CategoryRepository.js';
import { ProductRepository } from '../repository/ProductRepository.js';

export const createProductService = async (data) => {
  try {
    const result = await ProductRepository.create(data);
    await categoryRepository.addProductToCategory(data.category, result._id);
    return result;
  } catch (error) {
    console.error('Error creating document:', error);
    throw error;
  }
};

export const updateProductService = async (id, data) => {
  try {
    console.log('Data from updateProductService:', data);

    // Fetch existing product
    const product = await ProductRepository.getById(id);
    if (!product) {
      throw new Error('Product not found');
    }

    const existingImgs = Array.isArray(product.productImgs)
      ? product.productImgs
      : [];
    const newImgs = Array.isArray(data.productImgs) ? data.productImgs : [];

    data.productImgs = [...existingImgs, ...newImgs];

    const result = await ProductRepository.update(id, data);
    return result;
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
};

export const deleteProductService = async (id) => {
  try {
    const product = await ProductRepository.getById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    // await removeImgFromCloudinary(product.productImgs.map((img) => img));
    await removeImgsArrayFromCloudinary(product.productImgs);
    const result = await ProductRepository.delete(id);
    return result;
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
};

export const getAllProductsService = async (page, limit) => {
  try {
    const result = await ProductRepository.getAll({ page, limit });
    return result;
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw error;
  }
};

export const getProductByIdService = async (id) => {
  try {
    const result = await ProductRepository.getById(id);
    return result;
  } catch (error) {
    console.error('Error get document service:', error);
    throw error;
  }
};
