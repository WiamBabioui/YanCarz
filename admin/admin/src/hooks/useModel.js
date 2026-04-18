import { useState, useCallback, useEffect } from 'react';
import { modelService } from '../services/modelService';

export const useModel = () => {
    const [models, setModels] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchModels = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await modelService.getModels();
            setModels(data);
        } catch (err) {
            setError(err.message || 'Error fetching models');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchModels();
    }, [fetchModels]);

    const addModel = async (modelData) => {
        try {
            const data = await modelService.createModel(modelData);
            setModels((prev) => [...prev, data]);
            return { success: true, data };
        } catch (err) {
            return { success: false, error: err.message || 'Failed to add model' };
        }
    };

    const updateModel = async (id, modelData) => {
        try {
            const data = await modelService.updateModel(id, modelData);
            setModels((prev) => prev.map((m) => (m.id === id ? data : m)));
            return { success: true, data };
        } catch (err) {
            return { success: false, error: err.message || 'Failed to update model' };
        }
    };

    const deleteModel = async (id) => {
        try {
            await modelService.deleteModel(id);
            setModels((prev) => prev.filter((m) => m.id !== id));
            return { success: true };
        } catch (err) {
            return { success: false, error: err.message || 'Failed to delete model' };
        }
    };

    return {
        models,
        isLoading,
        error,
        addModel,
        updateModel,
        deleteModel,
        refreshModels: fetchModels,
    };
};
