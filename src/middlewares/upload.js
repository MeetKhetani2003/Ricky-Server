import multer from 'multer';

import { cloudinary, cloudinaryStorage } from '../configs/cloudinaryConfig.js';

const upload = multer({ storage: cloudinaryStorage });
export const removeImgFromCloudinary = async (url) => {
  try {
    const id = url.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(id);
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
};

export const removeImgsArrayFromCloudinary = async (urls) => {
  try {
    for (let i = 0; i < urls.length; i++) {
      const id = urls[i].split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(id);
    }
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
};
export default upload;
