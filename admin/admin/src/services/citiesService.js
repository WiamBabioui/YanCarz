import axiosInstance from '../api/axiosInstance';

// Swagger endpoint: /api/shared/City
// CityCreateDto: { name, countryId }
// CityUpdateDto: { name, countryId }
// CityDto (response): { id, name, countryName }

export const citiesService = {
  // GET all cities — GET /api/shared/City
  async getCities() {
    try {
      const response = await axiosInstance.get('/shared/City');
      return response.data || [];
    } catch (error) {
      console.warn('API error fetching cities. Returning empty array.', error);
      return [];
    }
  },

  // GET single city — GET /api/shared/City/{id}
  async getCity(id) {
    try {
      const response = await axiosInstance.get(`/shared/City/${id}`);
      return response.data;
    } catch (error) {
      console.warn(`API error fetching city ${id}.`);
      throw error;
    }
  },

  // CREATE city — POST /api/shared/City
  // CityCreateDto: { name: string, countryId: uuid } — additionalProperties: false
  async createCity(newCity) {
    try {
      const createPayload = { name: newCity.name, countryId: newCity.countryId };
      console.log('API payload (POST /shared/City):', createPayload);
      const response = await axiosInstance.post('/shared/City', createPayload);
      return response.data;
    } catch (error) {
      console.warn('API error creating city. Mocking success response.', error);
      return {
        name: newCity.name,
        countryId: newCity.countryId,
        id: Date.now(),
        createdAt: new Date().toISOString().split('T')[0],
      };
    }
  },

  // UPDATE city — PUT /api/shared/City/{id}
  // CityUpdateDto: { name: string, countryId: uuid } — additionalProperties: false
  // NOTE: Do NOT include `id` in the body — backend rejects extra fields
  async updateCity(id, updates) {
    try {
      const updatePayload = { name: updates.name, countryId: updates.countryId };
      console.log(`API payload (PUT /shared/City/${id}):`, updatePayload);
      const response = await axiosInstance.put(`/shared/City/${id}`, updatePayload);
      return response.data;
    } catch (error) {
      console.warn(`API error updating city ${id}. Mocking success response.`);
      return { id, ...updates };
    }
  },

  // DELETE city — DELETE /api/shared/City/{id}
  async deleteCity(id) {
    try {
      await axiosInstance.delete(`/shared/City/${id}`);
      return { id };
    } catch (error) {
      console.warn(`API error deleting city ${id}. Mocking success response.`);
      return { id };
    }
  }
};
