import { useState, useCallback, useEffect } from 'react';
import { devisesService } from '../services/devisesService';

export const useDevises = () => {
  const [devises, setDevises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDevises = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await devisesService.getDevises();
      setDevises(data);
    } catch (err) {
      setError(err.message || 'Error fetching devises');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDevises();
  }, [fetchDevises]);

  const addDevise = async (deviseData) => {
    try {
      const data = await devisesService.createDevise(deviseData);
      setDevises((prev) => [...prev, data]);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message || 'Failed to add devise' };
    }
  };

  const updateDevise = async (id, deviseData) => {
    try {
      const data = await devisesService.updateDevise(id, deviseData);
      setDevises((prev) => prev.map((c) => (c.id === id ? data : c)));
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message || 'Failed to update devise' };
    }
  };

  const deleteDevise = async (id) => {
    try {
      await devisesService.deleteDevise(id);
      setDevises((prev) => prev.filter((c) => c.id !== id));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || 'Failed to delete devise' };
    }
  };

  return {
    devises,
    isLoading,
    error,
    addDevise,
    updateDevise,
    deleteDevise,
    refreshDevises: fetchDevises,
  };
};
