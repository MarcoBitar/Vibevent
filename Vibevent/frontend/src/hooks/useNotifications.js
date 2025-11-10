import { useState, useCallback, useEffect } from 'react';
import NotificationService from '../services/NotificationService.js';

// useNotifications manages notification data with CRUD, search, and status updates
export function useNotifications() {
  // === State ===
  const [notifications, setNotifications] = useState([]); // all notifications
  const [loading, setLoading] = useState(false);          // global loading flag
  const [error, setError] = useState(null);                // error message (if any)

  const notificationService = new NotificationService();   // service instance

  // === Fetch all notifications ===
  const getNotifications = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await notificationService.getAll();
      setNotifications(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // === Fetch notifications by user ID ===
  const getNotificationsByUserId = useCallback(async (userid) => {
    setLoading(true);
    setError(null);
    try {
      const data = await notificationService.getByUser(userid);
      setNotifications(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // === Create new notification ===
  const createNotification = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      const created = await notificationService.create(data);
      setNotifications(prev => [created, ...prev]); // prepend to list
      return created;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // === Update notification status (e.g. read/unread) ===
  const updateNotificationStatus = useCallback(async (notifid, notifstatus) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await notificationService.updateStatus(notifid, notifstatus);
      setNotifications(prev => prev.map(n => n.notifid === notifid ? updated : n));
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // === Delete notification by ID ===
  const deleteNotification = useCallback(async (notifid) => {
    setLoading(true);
    setError(null);
    try {
      await notificationService.delete(notifid);
      setNotifications(prev => prev.filter(n => n.notifid !== notifid));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // === Search notifications by query ===
  const searchNotifications = useCallback(async (search) => {
    setLoading(true);
    setError(null);
    try {
      const results = await notificationService.search(search);
      setNotifications(results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // === Mark notification as read ===
  const markAsRead = useCallback(async (notifid) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await notificationService.updateStatus(notifid, 'read');
      setNotifications(prev =>
        prev.map(n => n.notifid === notifid ? { ...n, notifstatus: 'read' } : n)
      );
      return updated;
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

  // === Auto-fetch notifications on mount ===
  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  // === Hook API ===
  return {
    notifications,
    loading,
    error,
    getNotifications,
    getNotificationsByUserId,
    createNotification,
    updateNotificationStatus,
    deleteNotification,
    searchNotifications,
    markAsRead,
    clearError
  };
}