import axiosInstance from '../api/axiosInstance';

// Swagger endpoint: /api/shared/Place
// PlaceCreateDto: { name, countryId }
// PlaceUpdateDto: { name, countryId }
// PlaceDto (response): { id, name, countryId }

export const zoneGeographyService = {
    // GET all zone geographies — GET /api/shared/Place
    async getZoneGeographies() {
        try {
            const response = await axiosInstance.get('/shared/Place');
            return response.data || [];
        } catch (error) {
            console.warn('API error fetching zone geographies. Returning empty array.', error);
            return [];
        }
    },

    // GET single zone geography — GET /api/shared/Place/{id}
    async getZoneGeography(id) {
        try {
            const response = await axiosInstance.get(`/shared/Place/${id}`);
            return response.data;
        } catch (error) {
            console.warn(`API error fetching zone geography ${id}.`);
            throw error;
        }
    },

    // CREATE zone geography — POST /api/shared/Place
    // PlaceCreateDto: { name: string, countryId: uuid } — additionalProperties: false
    async createZoneGeography(payload) {
        try {
            const createPayload = { name: payload.name, countryId: payload.countryId };
            console.log('API payload (POST /shared/Place):', createPayload);
            const response = await axiosInstance.post('/shared/Place', createPayload);
            return response.data;
        } catch (error) {
            console.warn('API error creating zone geography.', error);
            throw error;
        }
    },

    // UPDATE zone geography — PUT /api/shared/Place/{id}
    // PlaceUpdateDto: { name: string, countryId: uuid } — additionalProperties: false
    // NOTE: Do NOT include `id` in the request body — backend rejects extra fields
    async updateZoneGeography(id, payload) {
        try {
            const updatePayload = { name: payload.name, countryId: payload.countryId };
            console.log('API payload (PUT /shared/Place):', updatePayload);
            const response = await axiosInstance.put(`/shared/Place/${id}`, updatePayload);
            return response.data;
        } catch (error) {
            console.warn(`API error updating zone geography ${id}.`);
            throw error;
        }
    },

    // DELETE zone geography — DELETE /api/shared/Place/{id}
    async deleteZoneGeography(id) {
        try {
            await axiosInstance.delete(`/shared/Place/${id}`);
            return { id };
        } catch (error) {
            console.warn(`API error deleting zone geography ${id}.`);
            throw error;
        }
    }
};
