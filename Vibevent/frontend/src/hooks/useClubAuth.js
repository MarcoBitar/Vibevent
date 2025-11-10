import { useState, useCallback } from 'react';
import ClubService from '../services/ClubService.js';

// useClubAuth handles login/logout logic and tracks club auth state
export function useClubAuth() {
  // === State ===
  const [club, setClub] = useState(null);       // current authenticated club
  const [loading, setLoading] = useState(false); // loading flag for async ops
  const [error, setError] = useState(null);      // error message (if any)

  const clubService = new ClubService();         // service instance

  // === Login Handler ===
  const loginClub = useCallback(async (clubemail, clubpass) => {
    setLoading(true);
    setError(null);
    try {
      const loggedIn = await clubService.authenticate(clubemail, clubpass);
      setClub(loggedIn);                         // update club state
      return loggedIn;
    } catch (err) {
      setError(err.message);                     // surface error
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // === Logout Handler ===
  const logoutClub = useCallback(() => {
    setClub(null);                               // clear club state
    setError(null);
    // purge auth-related data from localStorage
    localStorage.removeItem('jwt');
    localStorage.removeItem('role');
    localStorage.removeItem('clubid');
    localStorage.removeItem('clubname');
    localStorage.removeItem('clubemail');
    localStorage.removeItem('clubpoints');
    localStorage.removeItem('clubpic');
  }, []);

  // === Manual Error Reset ===
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // === Hook API ===
  return {
    club,
    loading,
    error,
    loginClub,
    logoutClub,
    clearError
  };
}