import { useState, useCallback, useEffect } from 'react';
import { clientService } from '../services/clientService';

export const useClient = () => {
    const [clients, setClients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchClients = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await clientService.getClients();
            // In case the API returns an object or something unexpected, ensure it's an array
            setClients(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err.message || 'Error fetching clients');
            setClients([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchClients();
    }, [fetchClients]);

    const addClient = async (clientData) => {
        try {
            const data = await clientService.createClient(clientData);
            setClients((prev) => [...prev, data]);
            return { success: true, data };
        } catch (err) {
            return { success: false, error: err.message || 'Failed to add client' };
        }
    };

    const updateClient = async (id, clientData) => {
        try {
            const data = await clientService.updateClient(id, clientData);
            setClients((prev) => prev.map((c) => (c.id === id ? data : c)));
            return { success: true, data };
        } catch (err) {
            return { success: false, error: err.message || 'Failed to update client' };
        }
    };

    const deleteClient = async (id) => {
        try {
            await clientService.deleteClient(id);
            setClients((prev) => prev.filter((c) => c.id !== id));
            return { success: true };
        } catch (err) {
            return { success: false, error: err.message || 'Failed to delete client' };
        }
    };

    return {
        clients,
        isLoading,
        error,
        addClient,
        updateClient,
        deleteClient,
        refreshClients: fetchClients,
    };
};
