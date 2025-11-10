import { useState, useCallback, useEffect } from 'react';
import AttendanceService from '../services/AttendanceService.js';

// useAttendances manages attendance records with CRUD and search capabilities
export function useAttendances() {
  // === State ===
  const [attendances, setAttendances] = useState([]);   // all attendance records
  const [loading, setLoading] = useState(false);        // global loading flag
  const [error, setError] = useState(null);             // error message (if any)

  const attendanceService = new AttendanceService();    // service instance

  // === Fetch all attendance records ===
  const getAttendances = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await attendanceService.getAll();
      setAttendances(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // === Create new attendance record ===
  const createAttendance = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      const created = await attendanceService.create(data);
      setAttendances(prev => [created, ...prev]); // prepend to list
      return created;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // === Update attendance by ID ===
  const updateAttendance = useCallback(async (attendid, data) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await attendanceService.update(attendid, data);
      setAttendances(prev => prev.map(a => a.attendid === attendid ? updated : a));
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // === Delete attendance by ID ===
  const deleteAttendance = useCallback(async (attendid) => {
    setLoading(true);
    setError(null);
    try {
      await attendanceService.delete(attendid);
      setAttendances(prev => prev.filter(a => a.attendid !== attendid));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // === Search attendance records by query ===
  const searchAttendances = useCallback(async (search) => {
    setLoading(true);
    setError(null);
    try {
      const results = await attendanceService.search(search);
      setAttendances(results);
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

  // === Auto-fetch attendances on mount ===
  useEffect(() => {
    getAttendances();
  }, [getAttendances]);

  // === Hook API ===
  return {
    attendances,
    loading,
    error,
    getAttendances,
    createAttendance,
    updateAttendance,
    deleteAttendance,
    searchAttendances,
    clearError
  };
}