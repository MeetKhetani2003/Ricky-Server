import Category from '../models/Category.js';
import { curdRepository } from './curdRepository.js';

export const categoryRepository = {
  ...curdRepository(Category),
  getProductsByCategory: async (category, page, limit) => {
    try {
      const categoryData = await Category.findById(category).populate({
        path: 'products',
        options: {
          skip: page * limit, // ✅ Apply pagination inside populate
          limit: limit,
        },
      });

      if (!categoryData) {
        throw new Error(`Category '${category}' not found`);
      }

      return categoryData;
    } catch (error) {
      console.error('Error fetching category products:', error);
      throw error;
    }
  },

  addProductToCategory: async (category, productId) => {
    try {
      const categoryData = await Category.findById(category);
      console.log('catdata', categoryData);

      const result = await Category.findByIdAndUpdate(
        categoryData._id,
        { $push: { products: productId } },
        { new: true }
      );
      return result;
    } catch (error) {
      console.error('Error get document service:', error);
      throw error;
    }
  },
};
