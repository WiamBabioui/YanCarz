import { useState, useCallback, useEffect } from 'react';
import { userService } from '../services/userService';

export const useUser = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUsers = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await userService.getUsers();
            setUsers(data);
        } catch (err) {
            setError(err.message || 'Error fetching users');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const addUser = async (userData) => {
        try {
            const data = await userService.createUser(userData);
            setUsers((prev) => [...prev, data]);
            return { success: true, data };
        } catch (err) {
            return { success: false, error: err.message || 'Failed to add user' };
        }
    };

    const updateUser = async (id, userData) => {
        try {
            const data = await userService.updateUser(id, userData);
            setUsers((prev) => prev.map((u) => (u.id === id ? data : u)));
            return { success: true, data };
        } catch (err) {
            return { success: false, error: err.message || 'Failed to update user' };
        }
    };

    const deleteUser = async (id) => {
        try {
            await userService.deleteUser(id);
            setUsers((prev) => prev.filter((u) => u.id !== id));
            return { success: true };
        } catch (err) {
            return { success: false, error: err.message || 'Failed to delete user' };
        }
    };

    return {
        users,
        isLoading,
        error,
        addUser,
        updateUser,
        deleteUser,
        refreshUsers: fetchUsers,
    };
};
