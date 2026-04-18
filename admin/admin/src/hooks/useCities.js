import { useState, useCallback, useEffect } from 'react';
import { citiesService } from '../services/citiesService';
import { countriesService } from '../services/countriesService';

export const useCities = () => {
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [citiesData, countriesData] = await Promise.all([
        citiesService.getCities(),
        countriesService.getCountries()
      ]);
      setCities(citiesData);
      setCountries(countriesData);
    } catch (err) {
      setError(err.message || 'Error fetching data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addCity = async (cityData) => {
    try {
      const data = await citiesService.createCity(cityData);
      setCities((prev) => [...prev, data]);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message || 'Failed to add city' };
    }
  };

  const updateCity = async (id, cityData) => {
    try {
      const data = await citiesService.updateCity(id, cityData);
      setCities((prev) => prev.map((c) => (c.id === id ? data : c)));
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message || 'Failed to update city' };
    }
  };

  const deleteCity = async (id) => {
    try {
      await citiesService.deleteCity(id);
      setCities((prev) => prev.filter((c) => c.id !== id));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || 'Failed to delete city' };
    }
  };

  return {
    cities,
    countries,
    isLoading,
    error,
    addCity,
    updateCity,
    deleteCity,
    refreshData: fetchData,
  };
};
