import axiosInstance from '../api/axiosInstance';

export const markeService = {
    // GET all marks
    async getMarks() {
        try {
            const response = await axiosInstance.get('/shared/Mark');
            return response.data || [];
        } catch (error) {
            console.warn('API error fetching marks. Returning empty array.', error);
            return [];
        }
    },

    // GET single mark
    async getMark(id) {
        try {
            const response = await axiosInstance.get(`/shared/Mark/${id}`);
            return response.data;
        } catch (error) {
            console.warn(`API error fetching mark ${id}.`);
            throw error;
        }
    },

    // CREATE mark
    async createMark(name) {
        try {
            console.log("API payload (POST /shared/Mark):", name);
            // If server expects string as [FromBody], it should be JSON-encoded string
            const response = await axiosInstance.post('/shared/Mark', JSON.stringify(name), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.warn('API error creating mark.', error);
            throw error;
        }
    },

    // UPDATE mark
    async updateMark(id, name) {
        try {
            const payload = { id, name };
            console.log("API payload (PUT /shared/Mark):", payload);
            const response = await axiosInstance.put(`/shared/Mark/${id}`, payload);
            return response.data;
        } catch (error) {
            console.warn(`API error updating mark ${id}.`);
            throw error;
        }
    },

    // DELETE mark
    async deleteMark(id) {
        try {
            await axiosInstance.delete(`/shared/Mark/${id}`);
            return { id };
        } catch (error) {
            console.warn(`API error deleting mark ${id}.`);
            throw error;
        }
    }
};
