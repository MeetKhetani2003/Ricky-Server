import Products from '../models/Products.js';
import { curdRepository } from './curdRepository.js';

export const ProductRepository = {
  ...curdRepository(Products),
};
