import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECERET,
  CLOUDINARY_CLOUD_NAME,
} from './variablesConf.js';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

console.log(CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECERET);

// Load environment variables
dotenv.config();

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECERET,
});

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary, // ✅ Make sure this is correctly initialized
  params: {
    folder: 'ricky-product-images',
    allowed_formats: ['jpg', 'png', 'jpeg'], // ✅ Define allowed formats
  },
});

export { cloudinary, cloudinaryStorage };
