import { useEffect, useState } from 'react';
import NotificationCard from "../NotificationCard/NotificationCard.jsx";
import { useNotifications } from "../../hooks/useNotifications.js";
import './NotificationList.css';

// NotificationList fetches and displays up to 5 unique notifications for a given user/club ID
export default function NotificationList({ id }) {
  const { notifications, getNotificationsByUserId, markAsRead } = useNotifications();
  const [localNotifications, setLocalNotifications] = useState([]);

  // Fetch notifications when ID changes
  useEffect(() => {
    if (id) getNotificationsByUserId(id);
  }, [id, getNotificationsByUserId]);

  // Filter and dedupe notifications by content
  useEffect(() => {
    if (notifications && id) {
      const userNotifs = notifications.filter(n => n.userid === Number(id));

      // Deduplicate by notifcontent (latest wins)
      const uniqueByContent = Array.from(
        new Map(userNotifs.map(n => [n.notifcontent, n])).values()
      );

      setLocalNotifications(uniqueByContent);
    }
  }, [notifications, id]);

  // Mark notification as read and remove from local list
  const handleMarkRead = async (notifid) => {
    try {
      await markAsRead(notifid);
      setLocalNotifications(prev =>
        prev.filter(n => n.notifid !== notifid)
      );
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
    }
  };

  // Limit to top 5 notifications
  const displayedNotifications = localNotifications.slice(0, 5);

  return (
    <div
      className="notification-list"
      onClick={(e) => e.stopPropagation()}  // prevent parent click handlers from firing
    >
      {displayedNotifications.length > 0 ? (
        displayedNotifications.map((notif) => (
          <NotificationCard
            key={notif.notifid}
            notif={notif}
            onMarkRead={handleMarkRead}
          />
        ))
      ) : (
        <div className="no-notifications">No notifications found.</div>
      )}
    </div>
  );
}