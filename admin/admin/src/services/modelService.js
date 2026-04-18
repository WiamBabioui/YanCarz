import axiosInstance from '../api/axiosInstance';

// Swagger endpoint: /api/shared/Model
// POST/PUT body: ModelDto { id, name, typeModel, markId, markName }
// ModelDto (response): { id, name, typeModel, markId, markName }

export const modelService = {
    // GET all models — GET /api/shared/Model
    async getModels() {
        try {
            const response = await axiosInstance.get('/shared/Model');
            return response.data || [];
        } catch (error) {
            console.warn('API error fetching models. Returning empty array.', error);
            return [];
        }
    },

    // GET single model — GET /api/shared/Model/{id}
    async getModel(id) {
        try {
            const response = await axiosInstance.get(`/shared/Model/${id}`);
            return response.data;
        } catch (error) {
            console.warn(`API error fetching model ${id}.`);
            throw error;
        }
    },

    // CREATE model — POST /api/shared/Model
    // ModelDto: { name, typeModel, markId } — id and markName are server-generated
    async createModel(payload) {
        try {
            const createPayload = {
                name: payload.name,
                typeModel: payload.typeModel || null,
                markId: payload.markId,
            };
            console.log('API payload (POST /shared/Model):', createPayload);
            const response = await axiosInstance.post('/shared/Model', createPayload);
            return response.data;
        } catch (error) {
            console.warn('API error creating model.', error);
            throw error;
        }
    },

    // UPDATE model — PUT /api/shared/Model/{id}
    // ModelDto: { id, name, typeModel, markId } — markName is server-generated
    async updateModel(id, payload) {
        try {
            const updatePayload = {
                id,
                name: payload.name,
                typeModel: payload.typeModel || null,
                markId: payload.markId,
            };
            console.log('API payload (PUT /shared/Model):', updatePayload);
            const response = await axiosInstance.put(`/shared/Model/${id}`, updatePayload);
            return response.data;
        } catch (error) {
            console.warn(`API error updating model ${id}.`);
            throw error;
        }
    },

    // DELETE model — DELETE /api/shared/Model/{id}
    async deleteModel(id) {
        try {
            await axiosInstance.delete(`/shared/Model/${id}`);
            return { id };
        } catch (error) {
            console.warn(`API error deleting model ${id}.`);
            throw error;
        }
    }
};
