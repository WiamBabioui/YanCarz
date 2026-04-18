import { useState, useCallback, useEffect } from 'react';
import { zoneGeographyService } from '../services/zoneGeographyService';
import { countriesService } from '../services/countriesService';

export const useZoneGeography = () => {
    const [zoneGeographies, setZoneGeographies] = useState([]);
    const [countries, setCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const [zonesData, countriesData] = await Promise.all([
                zoneGeographyService.getZoneGeographies(),
                countriesService.getCountries()
            ]);
            setZoneGeographies(zonesData);
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

    const addZoneGeography = async (zoneData) => {
        try {
            const data = await zoneGeographyService.createZoneGeography(zoneData);
            setZoneGeographies((prev) => [...prev, data]);
            return { success: true, data };
        } catch (err) {
            return { success: false, error: err.message || 'Failed to add zone geography' };
        }
    };

    const updateZoneGeography = async (id, zoneData) => {
        try {
            const data = await zoneGeographyService.updateZoneGeography(id, zoneData);
            setZoneGeographies((prev) => prev.map((z) => (z.id === id ? data : z)));
            return { success: true, data };
        } catch (err) {
            return { success: false, error: err.message || 'Failed to update zone geography' };
        }
    };

    const deleteZoneGeography = async (id) => {
        try {
            await zoneGeographyService.deleteZoneGeography(id);
            setZoneGeographies((prev) => prev.filter((z) => z.id !== id));
            return { success: true };
        } catch (err) {
            return { success: false, error: err.message || 'Failed to delete zone geography' };
        }
    };

    return {
        zoneGeographies,
        countries,
        isLoading,
        error,
        addZoneGeography,
        updateZoneGeography,
        deleteZoneGeography,
        refreshData: fetchData,
    };
};
