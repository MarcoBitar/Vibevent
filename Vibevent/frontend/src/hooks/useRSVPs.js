import { useState, useCallback, useEffect } from 'react';
import RSVPService from '../services/RSVPService.js';

// useRSVPs manages RSVP data and exposes CRUD + query utilities
export function useRSVPs() {
  // === State ===
  const [rsvps, setRSVPs] = useState([]);       // all RSVP records
  const [loading, setLoading] = useState(false); // global loading flag
  const [error, setError] = useState(null);      // error message (if any)

  const rsvpService = new RSVPService();         // service instance

  // === Fetch all RSVPs ===
  const getRSVPs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await rsvpService.getAll();
      setRSVPs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // === Create new RSVP ===
  const createRSVP = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      const created = await rsvpService.create(data);
      setRSVPs(prev => [created, ...prev]); // prepend to list
      return created;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // === Update RSVP by ID ===
  const updateRSVP = useCallback(async (rsvpid, data) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await rsvpService.update(rsvpid, data);
      setRSVPs(prev => prev.map(r => r.rsvpid === rsvpid ? updated : r));
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // === Delete RSVP by ID ===
  const deleteRSVP = useCallback(async (rsvpid) => {
    setLoading(true);
    setError(null);
    try {
      await rsvpService.delete(rsvpid);
      setRSVPs(prev => prev.filter(r => r.rsvpid !== rsvpid));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // === Search RSVPs by query ===
  const searchRSVPs = useCallback(async (search) => {
    setLoading(true);
    setError(null);
    try {
      const results = await rsvpService.search(search);
      setRSVPs(results);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // === Count RSVPs for a specific event by status ===
  const getRSVPCountByEventId = useCallback(async (eventid, rsvpstatus = 'yes') => {
    setLoading(true);
    setError(null);
    try {
      const count = await rsvpService.countByStatusAndEvent(eventid, rsvpstatus);
      return count;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // === Check if a user has RSVP'd to an event ===
  const existsByEventAndUser = useCallback(async (eventid, userid) => {
    setLoading(true);
    setError(null);
    try {
      const data = await rsvpService.existsByEventAndUser(eventid, userid);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // === Get all RSVPs by user ID ===
  const getRSVPsByUser = useCallback(async (userid) => {
    setLoading(true);
    setError(null);
    try {
      const data = await rsvpService.getByUser(userid);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // === Get all RSVPs by event ID ===
  const getRSVPsByEvent = useCallback(async (eventid) => {
    setLoading(true);
    setError(null);
    try {
      const data = await rsvpService.getByEvent(eventid);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // === Count RSVPs for a user by status ===
  const getRSVPCountByStatusAndUser = useCallback(async (userid, rsvpstatus = 'yes') => {
    setLoading(true);
    setError(null);
    try {
      const count = await rsvpService.countByStatusAndUser(userid, rsvpstatus);
      return count;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // === Manual Error Reset ===
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // === Auto-fetch RSVPs on mount ===
  useEffect(() => {
    getRSVPs();
  }, [getRSVPs]);

  // === Hook API ===
  return {
    rsvps,
    loading,
    error,
    getRSVPs,
    createRSVP,
    updateRSVP,
    deleteRSVP,
    searchRSVPs,
    getRSVPCountByEventId,
    existsByEventAndUser,
    getRSVPsByUser,
    getRSVPsByEvent,
    getRSVPCountByStatusAndUser,
    clearError
  };
}