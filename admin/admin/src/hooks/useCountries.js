import { useState, useCallback, useEffect } from 'react';
import { countriesService } from '../services/countriesService';

export const useCountries = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCountries = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await countriesService.getCountries();
      setCountries(data);
    } catch (err) {
      setError(err.message || 'Error fetching countries');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  const addCountry = async (countryData) => {
    try {
      const data = await countriesService.createCountry(countryData);
      setCountries((prev) => [...prev, data]);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message || 'Failed to add country' };
    }
  };

  const updateCountry = async (id, countryData) => {
    try {
      const data = await countriesService.updateCountry(id, countryData);
      setCountries((prev) => prev.map((c) => (c.id === id ? data : c)));
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message || 'Failed to update country' };
    }
  };

  const deleteCountry = async (id) => {
    try {
      await countriesService.deleteCountry(id);
      setCountries((prev) => prev.filter((c) => c.id !== id));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || 'Failed to delete country' };
    }
  };

  return {
    countries,
    isLoading,
    error,
    addCountry,
    updateCountry,
    deleteCountry,
    refreshCountries: fetchCountries,
  };
};
