import { useState, useCallback, useEffect } from 'react';
import UserAchService from '../services/UserAchService.js';

// useUserAchs manages user achievement data with CRUD and search capabilities
export function useUserAchs() {
  // === State ===
  const [userAchs, setUserAchs] = useState([]);       // list of user achievements
  const [loading, setLoading] = useState(false);      // global loading flag
  const [error, setError] = useState(null);            // error message (if any)

  const userAchService = new UserAchService();         // service instance

  // === Fetch all achievements ===
  const getUserAchs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await userAchService.getAll();
      setUserAchs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // === Create new achievement ===
  const createUserAch = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      const created = await userAchService.create(data);
      setUserAchs(prev => [created, ...prev]); // prepend to list
      return created;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // === Delete achievement by ID ===
  const deleteUserAch = useCallback(async (uaid) => {
    setLoading(true);
    setError(null);
    try {
      await userAchService.delete(uaid);
      setUserAchs(prev => prev.filter(u => u.uaid !== uaid));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // === Search achievements by query ===
  const searchUserAchs = useCallback(async (search) => {
    setLoading(true);
    setError(null);
    try {
      const results = await userAchService.search(search);
      setUserAchs(results);
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
    getUserAchs();
  }, [getUserAchs]);

  // === Hook API ===
  return {
    userAchs,
    loading,
    error,
    getUserAchs,
    createUserAch,
    deleteUserAch,
    searchUserAchs,
    clearError
  };
}