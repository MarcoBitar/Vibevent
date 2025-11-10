import { useState, useCallback, useEffect } from 'react';
import ClubService from '../services/ClubService.js';

// useClubs manages club data with CRUD, search, and fetch-by-id capabilities
export function useClubs() {
  // === State ===
  const [clubs, setClubs] = useState([]);       // all club records
  const [loading, setLoading] = useState(false); // global loading flag
  const [error, setError] = useState(null);      // error message (if any)

  const clubService = new ClubService();         // service instance

  // === Fetch all clubs ===
  const getClubs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await clubService.getAll();
      setClubs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // === Fetch single club by ID ===
  const getClubById = useCallback(async (clubid) => {
    setLoading(true);
    setError(null);
    try {
      return await clubService.getById(clubid);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // === Create new club ===
  const createClub = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      const created = await clubService.create(data);
      setClubs(prev => [created, ...prev]); // prepend to list
      return created;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // === Update club by ID ===
  const updateClub = useCallback(async (clubid, data) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await clubService.update(clubid, data);
      setClubs(prev => prev.map(c => c.clubid === clubid ? updated : c));
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // === Delete club by ID ===
  const deleteClub = useCallback(async (clubid) => {
    setLoading(true);
    setError(null);
    try {
      await clubService.delete(clubid);
      setClubs(prev => prev.filter(c => c.clubid !== clubid));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // === Search clubs by query ===
  const searchClubs = useCallback(async (search) => {
    setLoading(true);
    setError(null);
    try {
      const results = await clubService.search(search);
      setClubs(results);
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

  // === Auto-fetch clubs on mount ===
  useEffect(() => {
    getClubs();
  }, [getClubs]);

  // === Hook API ===
  return {
    clubs,
    loading,
    error,
    getClubs,
    getClubById,
    createClub,
    updateClub,
    deleteClub,
    searchClubs,
    clearError
  };
}