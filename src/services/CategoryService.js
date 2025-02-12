import { cloudinary } from '../configs/cloudinaryConfig.js';
import { removeImgFromCloudinary } from '../middlewares/upload.js';
import Category from '../models/Category.js';
import { categoryRepository } from '../repository/CategoryRepository.js';

export const createCategoryService = async (data) => {
  try {
    const result = await categoryRepository.create(data);
    return result;
  } catch (error) {
    console.error('Error creating document:', error);
    throw error;
  }
};

export const getAllCategoriesService = async (page, limit) => {
  try {
    const result = await categoryRepository.getAll({ page, limit });
    return result;
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw error;
  }
};

export const getProductsByCategoryService = async (category, page, limit) => {
  try {
    const result = await categoryRepository.getProductsByCategory(
      category,
      page,
      limit
    );
    return result;
  } catch (error) {
    console.error('Error get document service:', error);
    throw error;
  }
};

export const getCategoryByIdService = async (id) => {
  try {
    const result = await Category.findById(id).populate('products');
    return result;
  } catch (error) {
    console.error('Error get document service:', error);
    throw error;
  }
};

export const updateCategoryService = async (id, data) => {
  try {
    const category = await categoryRepository.getById(id);
    if (!category) {
      throw new Error('Category not found');
    }
    if (data.img) {
      await removeImgFromCloudinary(category.img);
    }
    const result = await categoryRepository.update(id, data);
    return result;
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
};

export const deleteCategoryService = async (id) => {
  try {
    const category = await categoryRepository.getById(id);
    if (!category) {
      throw new Error('Category not found');
    }
    await removeImgFromCloudinary(category.img);
    const result = await categoryRepository.delete(id);

    return result;
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
};
