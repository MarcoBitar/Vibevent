import { useState, useCallback } from 'react';
import UserService from '../services/UserService.js';

// useUserAuth handles login/logout logic and tracks auth state
export function useUserAuth() {
  // === State ===
  const [user, setUser] = useState(null);       // current authenticated user
  const [loading, setLoading] = useState(false); // loading flag for async ops
  const [error, setError] = useState(null);      // error message (if any)

  const userService = new UserService();         // service instance

  // === Login Handler ===
  const loginUser = useCallback(async (useremail, userpass) => {
    setLoading(true);
    setError(null);
    try {
      const loggedIn = await userService.authenticate(useremail, userpass);
      setUser(loggedIn);                         // update user state
      return loggedIn;
    } catch (err) {
      setError(err.message);                     // surface error
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // === Logout Handler ===
  const logoutUser = useCallback(() => {
    setUser(null);                               // clear user state
    setError(null);
    // purge auth-related data from localStorage
    localStorage.removeItem('jwt');
    localStorage.removeItem('role');
    localStorage.removeItem('userid');
    localStorage.removeItem('username');
    localStorage.removeItem('userpoints');
    localStorage.removeItem('useremail');
    localStorage.removeItem('userpic');
  }, []);

  // === Manual Error Reset ===
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // === Hook API ===
  return {
    user,
    loading,
    error,
    loginUser,
    logoutUser,
    clearError
  };
}