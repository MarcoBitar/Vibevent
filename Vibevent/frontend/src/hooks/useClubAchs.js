import { useState, useCallback, useEffect } from 'react';
import ClubAchService from '../services/ClubAchService.js';

// useClubAchs manages club achievement data with CRUD and search capabilities
export function useClubAchs() {
  // === State ===
  const [clubAchs, setClubAchs] = useState([]);     // list of club achievements
  const [loading, setLoading] = useState(false);    // global loading flag
  const [error, setError] = useState(null);         // error message (if any)

  const clubAchService = new ClubAchService();      // service instance

  // === Fetch all club achievements ===
  const getClubAchs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await clubAchService.getAll();
      setClubAchs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // === Create new club achievement ===
  const createClubAch = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      const created = await clubAchService.create(data);
      setClubAchs(prev => [created, ...prev]); // prepend to list
      return created;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // === Delete club achievement by ID ===
  const deleteClubAch = useCallback(async (caid) => {
    setLoading(true);
    setError(null);
    try {
      await clubAchService.delete(caid);
      setClubAchs(prev => prev.filter(c => c.caid !== caid));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // === Search club achievements by query ===
  const searchClubAchs = useCallback(async (search) => {
    setLoading(true);
    setError(null);
    try {
      const results = await clubAchService.search(search);
      setClubAchs(results);
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
    getClubAchs();
  }, [getClubAchs]);

  // === Hook API ===
  return {
    clubAchs,
    loading,
    error,
    getClubAchs,
    createClubAch,
    deleteClubAch,
    searchClubAchs,
    clearError
  };
}