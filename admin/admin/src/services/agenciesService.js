import axiosInstance from '../api/axiosInstance';
import { initialAgencies } from '../data/agenciesData' // For fallback

export const agenciesService = {
  // GET all agencies
  async getAgencies() {
    try {
      const response = await axiosInstance.get('/portal/Agency');
      if (response.data && response.data.length > 0) {
        return response.data;
      }
      // If the API returns empty but we want to show UI, we can return fallback or just empty list
      return response.data;
    } catch (error) {
      console.warn('API error fetching agencies. Using fallback data.', error);
      // Fallback for development purposes
      return initialAgencies;
    }
  },

  // GET single agency
  async getAgency(id) {
    try {
      const response = await axiosInstance.get(`/portal/Agency/${id}`);
      return response.data;
    } catch (error) {
      console.warn(`API error fetching agency ${id}.`);
      throw error;
    }
  },

  // CREATE agency
  async createAgency(newAgency) {
    try {
      const response = await axiosInstance.post('/portal/Agency', newAgency);
      return response.data;
    } catch (error) {
      console.warn('API error creating agency. Mocking success response.', error);
      return {
        ...newAgency,
        id: Date.now(),
        status: 'active',
        createdAt: new Date().toISOString().split('T')[0],
      };
    }
  },

  // UPDATE agency
  // NOTE: PUT /api/portal/Agency/{id} does NOT exist in Swagger.
  // This is a client-side simulation only — the UI will reflect changes locally.
  async updateAgency(id, updates) {
    try {
      // Endpoint not available in backend — graceful local mock
      console.warn(`updateAgency: No PUT endpoint exists for Agency in the backend. Returning local mock for id=${id}.`);
      return { id, ...updates };
    } catch (error) {
      console.warn(`Error in updateAgency mock for agency ${id}.`);
      return { id, ...updates };
    }
  },

  // DELETE agency
  // NOTE: DELETE /api/portal/Agency/{id} does NOT exist in Swagger.
  // This is a client-side simulation only — the item is removed locally from the list.
  async deleteAgency(id) {
    try {
      // Endpoint not available in backend — graceful local mock
      console.warn(`deleteAgency: No DELETE endpoint exists for Agency in the backend. Returning local mock for id=${id}.`);
      return { id };
    } catch (error) {
      console.warn(`Error in deleteAgency mock for agency ${id}.`);
      return { id };
    }
  },

  // TOGGLE status (No explicit endpoint in swagger, so we simulate a PUT or PATCH if needed)
  async toggleStatus(id, currentStatus) {
    try {
      // Assuming a PUT would happen here or a specific status change endpoint
      const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
      // await axiosInstance.put(`/Agencies/${id}`, { status: newStatus });
      return newStatus;
    } catch (error) {
      const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
      return newStatus;
    }
  },
};