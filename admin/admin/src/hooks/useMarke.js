import { useState, useCallback, useEffect } from 'react';
import { markeService } from '../services/markeService';

export const useMarke = () => {
    const [marks, setMarks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMarks = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await markeService.getMarks();
            setMarks(data);
        } catch (err) {
            setError(err.message || 'Error fetching marks');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMarks();
    }, [fetchMarks]);

    const addMark = async (markData) => {
        try {
            const data = await markeService.createMark(markData);
            setMarks((prev) => [...prev, data]);
            return { success: true, data };
        } catch (err) {
            return { success: false, error: err.message || 'Failed to add mark' };
        }
    };

    const updateMark = async (id, markData) => {
        try {
            const data = await markeService.updateMark(id, markData);
            setMarks((prev) => prev.map((m) => (m.id === id ? data : m)));
            return { success: true, data };
        } catch (err) {
            return { success: false, error: err.message || 'Failed to update mark' };
        }
    };

    const deleteMark = async (id) => {
        try {
            await markeService.deleteMark(id);
            setMarks((prev) => prev.filter((m) => m.id !== id));
            return { success: true };
        } catch (err) {
            return { success: false, error: err.message || 'Failed to delete mark' };
        }
    };

    return {
        marks,
        isLoading,
        error,
        addMark,
        updateMark,
        deleteMark,
        refreshMarks: fetchMarks,
    };
};
