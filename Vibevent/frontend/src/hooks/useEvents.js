import { useState, useCallback, useEffect } from 'react';
import EventService from '../services/EventService.js';

// useEvents manages full event lifecycle: fetch, create, update, delete, and search
export function useEvents() {
  // === State ===
  const [events, setEvents] = useState([]);       // all event records
  const [loading, setLoading] = useState(true);   // global loading flag
  const [error, setError] = useState(null);       // error message (if any)

  const eventService = new EventService();        // service instance

  // === Fetch all events ===
  const getEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await eventService.getAll();
      setEvents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // === Create new event ===
  const createEvent = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      const created = await eventService.create(data);
      setEvents(prev => [created, ...prev]); // prepend to list
      return created;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // === Update event by ID ===
  const updateEvent = useCallback(async (eventid, data) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await eventService.update({ eventid, data });
      setEvents(prev => prev.map(e => e.eventid === eventid ? updated : e));
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // === Delete event by ID ===
  const deleteEvent = useCallback(async (eventid) => {
    setLoading(true);
    setError(null);
    try {
      await eventService.delete(eventid);
      setEvents(prev => prev.filter(e => e.eventid !== eventid));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // === Search events by query ===
  const searchEvents = useCallback(async (search) => {
    setLoading(true);
    setError(null);
    try {
      const results = await eventService.search(search);
      setEvents(results);
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

  // === Auto-fetch events on mount ===
  useEffect(() => {
    getEvents();
  }, [getEvents]);

  // === Hook API ===
  return {
    events,
    loading,
    error,
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    searchEvents,
    clearError
  };
}