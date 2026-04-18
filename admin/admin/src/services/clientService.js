import axiosInstance from '../api/axiosInstance';

export const clientService = {
  // GET all clients
  async getClients() {
    try {
      const response = await axiosInstance.get('/portal/Client');
      if (response.data) {
        return response.data;
      }
      return [];
    } catch (error) {
      console.warn('API error fetching clients.', error);
      return [];
    }
  },

  // CREATE client
  async createClient(newClient) {
    try {
      const response = await axiosInstance.post('/portal/Client', newClient);
      return response.data;
    } catch (error) {
      console.warn('API error creating client. Mocking success response.', error);
      return {
        ...newClient,
        id: Date.now()
      };
    }
  },

  // UPDATE client
  async updateClient(id, updates) {
    try {
      // Trying the standard PUT endpoint pattern
      const response = await axiosInstance.put(`/portal/Client/${id}`, updates);
      return response.data;
    } catch (error) {
      console.warn(`updateClient: Local mock for id=${id}.`);
      return { id, ...updates };
    }
  },

  // DELETE client
  async deleteClient(id) {
    try {
      const response = await axiosInstance.delete(`/portal/Client/${id}`);
      return response.data;
    } catch (error) {
      console.warn(`deleteClient: Local mock for id=${id}.`);
      return { id };
    }
  }
};
