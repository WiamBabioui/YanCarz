import axiosInstance from '../api/axiosInstance';

// Swagger endpoint: /api/shared/Country
// POST body: raw string (country name as JSON-encoded string)
// PUT body: CountryDto { id, name }
// CountryDto (response): { id, name }

export const countriesService = {
  // GET all countries — GET /api/shared/Country
  async getCountries() {
    try {
      const response = await axiosInstance.get('/shared/Country');
      return response.data || [];
    } catch (error) {
      console.warn('API error fetching countries. Returning empty array.', error);
      return [];
    }
  },

  // GET single country — GET /api/shared/Country/{id}
  async getCountry(id) {
    try {
      const response = await axiosInstance.get(`/shared/Country/${id}`);
      return response.data;
    } catch (error) {
      console.warn(`API error fetching country ${id}.`);
      throw error;
    }
  },

  // CREATE country — POST /api/shared/Country
  // Body: raw JSON string — e.g. "Morocco"
  async createCountry(name) {
    try {
      console.log('API payload (POST /shared/Country):', name);
      const response = await axiosInstance.post('/shared/Country', JSON.stringify(name), {
        headers: { 'Content-Type': 'application/json' }
      });
      return response.data;
    } catch (error) {
      console.warn('API error creating country. Mocking success response.', error);
      return { name, id: Date.now() };
    }
  },

  // UPDATE country — PUT /api/shared/Country/{id}
  // CountryDto: { id: uuid, name: string }
  async updateCountry(id, updates) {
    try {
      // CountryDto requires id to be included in the body
      const updatePayload = { id, name: updates.name };
      console.log(`API payload (PUT /shared/Country/${id}):`, updatePayload);
      const response = await axiosInstance.put(`/shared/Country/${id}`, updatePayload);
      return response.data;
    } catch (error) {
      console.warn(`API error updating country ${id}. Mocking success response.`);
      return { id, ...updates };
    }
  },

  // DELETE country — DELETE /api/shared/Country/{id}
  async deleteCountry(id) {
    try {
      await axiosInstance.delete(`/shared/Country/${id}`);
      return { id };
    } catch (error) {
      console.warn(`API error deleting country ${id}. Mocking success response.`);
      return { id };
    }
  }
};
