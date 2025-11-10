import { useState, useCallback, useEffect } from 'react';
import AchievementService from '../services/AchievementService.js';

// useAchievements manages achievement records with CRUD and search capabilities
export function useAchievements() {
  // === State ===
  const [achievements, setAchievements] = useState([]); // all achievement records
  const [loading, setLoading] = useState(false);        // global loading flag
  const [error, setError] = useState(null);             // error message (if any)

  const achievementService = new AchievementService();  // service instance

  // === Fetch all achievements ===
  const getAchievements = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await achievementService.getAll();
      setAchievements(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // === Create new achievement ===
  const createAchievement = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      const created = await achievementService.create(data);
      setAchievements(prev => [created, ...prev]); // prepend to list
      return created;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // === Update achievement by ID ===
  const updateAchievement = useCallback(async (achid, data) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await achievementService.update(achid, data);
      setAchievements(prev => prev.map(a => a.achid === achid ? updated : a));
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // === Delete achievement by ID ===
  const deleteAchievement = useCallback(async (achid) => {
    setLoading(true);
    setError(null);
    try {
      await achievementService.delete(achid);
      setAchievements(prev => prev.filter(a => a.achid !== achid));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // === Search achievements by query ===
  const searchAchievements = useCallback(async (search) => {
    setLoading(true);
    setError(null);
    try {
      const results = await achievementService.search(search);
      setAchievements(results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // === Manual Error Reset ===
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // === Auto-fetch achievements on mount ===
  useEffect(() => {
    getAchievements();
  }, [getAchievements]);

  // === Hook API ===
  return {
    achievements,
    loading,
    error,
    getAchievements,
    createAchievement,
    updateAchievement,
    deleteAchievement,
    searchAchievements,
    clearError
  };
}