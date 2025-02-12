import Inquiry from '../models/Inquiry.js';
import { curdRepository } from './curdRepository.js';

export const InquiryRepository = {
  ...curdRepository(Inquiry),
};
