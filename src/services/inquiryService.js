import { InquiryRepository } from '../repository/inquiryrepository.js';

export const createInquiryService = async (data) => {
  try {
    const result = await InquiryRepository.create(data);
    return result;
  } catch (error) {
    console.error('Error creating document:', error);
    throw error;
  }
};

export const getAllInquiriesService = async (page, limit) => {
  try {
    const result = await InquiryRepository.getAll({ page, limit });
    return result;
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw error;
  }
};

export const deleteInquiryService = async (id) => {
  try {
    const result = await InquiryRepository.delete(id);
    return result;
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
};
