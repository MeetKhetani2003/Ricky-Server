export const curdRepository = (model) => ({
  create: async (data) => {
    try {
      const result = await model.create(data);
      return result;
    } catch (error) {
      console.error('Error creating document:', error);
      throw error;
    }
  },
  getAll: async ({ page = 0, limit = 10 }) => {
    try {
      const results = await model
        .find()
        .skip(page * limit)
        .limit(limit);
      return results;
    } catch (error) {
      console.error('Error fetching documents:', error);
      throw error;
    }
  },
  getById: async (id) => {
    try {
      const response = await model.findById(id);
      console.log(response);

      return response;
    } catch (error) {
      console.error('Error updating document:', error);
      throw error;
    }
  },
  update: async (id, data) => {
    try {
      const result = await model.findByIdAndUpdate(id, data, { new: true });
      return result;
    } catch (error) {
      console.error('Error updating document:', error);
      throw error;
    }
  },
  delete: async (id) => {
    try {
      await model.findByIdAndDelete(id);
      return { success: true };
    } catch (error) {
      console.error('Error deleting document:', error);
      throw error;
    }
  },
});
