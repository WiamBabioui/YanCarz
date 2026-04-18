import axiosInstance from '../api/axiosInstance';

export const userService = {
    // GET all users
    async getUsers() {
        try {
            const response = await axiosInstance.get('/admin/User');
            return response.data || [];
        } catch (error) {
            console.warn('API error fetching users. Returning empty array.', error);
            return [];
        }
    },

    // GET single user
    async getUser(id) {
        try {
            const response = await axiosInstance.get(`/admin/User/${id}`);
            return response.data;
        } catch (error) {
            console.warn(`API error fetching user ${id}.`);
            throw error;
        }
    },

    // CREATE user
    async createUser(payload) {
        try {
            console.log("API payload (POST /admin/User):", payload);
            const response = await axiosInstance.post('/admin/User', payload);
            return response.data;
        } catch (error) {
            console.warn('API error creating user.', error);
            throw error;
        }
    },

    // UPDATE user
    async updateUser(id, payload) {
        try {
            const fullPayload = { id, name: payload.name, email: payload.email };
            console.log("API payload (PUT /admin/User):", fullPayload);
            const response = await axiosInstance.put(`/admin/User/${id}`, fullPayload);
            return response.data;
        } catch (error) {
            console.warn(`API error updating user ${id}.`);
            throw error;
        }
    },

    // DELETE user
    async deleteUser(id) {
        try {
            await axiosInstance.delete(`/admin/User/${id}`);
            return { id };
        } catch (error) {
            console.warn(`API error deleting user ${id}.`);
            throw error;
        }
    }
};
