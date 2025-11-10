import { useState, useCallback, useEffect } from 'react';
import UserService from '../services/UserService.js';

// useUsers provides CRUD operations and state management for user data
export function useUsers() {
  // === State ===
  const [users, setUsers] = useState([]);       // list of all users
  const [loading, setLoading] = useState(false); // global loading flag
  const [error, setError] = useState(null);      // error message (if any)

  const userService = new UserService();         // service instance

  // === Fetch all users ===
  const getUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await userService.getAll();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // === Fetch single user by ID ===
  const getUserById = useCallback(async (userid) => {
    setLoading(true);
    setError(null);
    try {
      return await userService.getById(userid);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // === Create new user ===
  const createUser = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      const created = await userService.create(data);
      setUsers(prev => [created, ...prev]); // prepend to list
      return created;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // === Update existing user ===
  const updateUser = useCallback(async (userid, data) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await userService.update(userid, data);
      setUsers(prev => prev.map(u => u.userid === userid ? updated : u));
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // === Delete user by ID ===
  const deleteUser = useCallback(async (userid) => {
    setLoading(true);
    setError(null);
    try {
      await userService.delete(userid);
      setUsers(prev => prev.filter(u => u.userid !== userid));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // === Search users by query ===
  const searchUsers = useCallback(async (search) => {
    setLoading(true);
    setError(null);
    try {
      const results = await userService.search(search);
      setUsers(results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // === Clear error manually ===
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // === Auto-fetch users on mount ===
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  // === Hook API ===
  return {
    users,
    loading,
    error,
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    searchUsers,
    clearError
  };
}