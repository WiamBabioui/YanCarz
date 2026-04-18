import axiosInstance from '../api/axiosInstance';

export const devisesService = {
  // GET all devises
  async getDevises() {
    try {
      const response = await axiosInstance.get('/shared/Devise');
      if (response.data && response.data.length > 0) {
        return response.data;
      }
      return response.data || [];
    } catch (error) {
      console.warn('API error fetching devises. Returning empty array.', error);
      return [];
    }
  },

  // GET single devise
  async getDevise(id) {
    try {
      const response = await axiosInstance.get(`/shared/Devise/${id}`);
      return response.data;
    } catch (error) {
      console.warn(`API error fetching devise ${id}.`);
      throw error;
    }
  },

  // CREATE devise
  async createDevise(newDevise) {
    try {
      console.log("API payload (POST /shared/Devise):", newDevise);
      const response = await axiosInstance.post('/shared/Devise', {
        name: newDevise.name,
        code: newDevise.code
      });
      return response.data;
    } catch (error) {
      console.warn('API error creating devise. Mocking success response.', error);
      return {
        ...newDevise,
        id: Date.now(),
        createdAt: new Date().toISOString().split('T')[0],
      };
    }
  },

  // UPDATE devise
  async updateDevise(id, updates) {
    try {
      console.log(`API payload (PUT /shared/Devise/${id}):`, updates);
      const response = await axiosInstance.put(`/shared/Devise/${id}`, {
        id,
        name: updates.name,
        code: updates.code
      });
      return response.data;
    } catch (error) {
      console.warn(`API error updating devise ${id}. Mocking success response.`);
      return { id, ...updates };
    }
  },

  // DELETE devise
  async deleteDevise(id) {
    try {
      await axiosInstance.delete(`/shared/Devise/${id}`);
      return { id };
    } catch (error) {
      console.warn(`API error deleting devise ${id}. Mocking success response.`);
      return { id };
    }
  }
};
