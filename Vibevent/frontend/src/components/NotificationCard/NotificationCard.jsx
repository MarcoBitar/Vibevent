import { useState } from 'react';
import './NotificationCard.css';

// NotificationCard displays a single notification and marks it as read on click
export default function NotificationCard({ notif, onMarkRead }) {
  const [removing, setRemoving] = useState(false); // UI flag for transition state

  // Handle click to mark notification as read
  const handleClick = async () => {
    if (notif.notifstatus === 'unread' && !removing) {
      setRemoving(true);                     // trigger UI transition
      await onMarkRead?.(notif.notifid);     // call parent handler if provided
    }
  };

  return (
    <div
      className={`notification-card ${notif.notifstatus} ${removing ? 'removing' : ''}`}
      onClick={handleClick}
    >
      {/* Notification type (e.g. event-update) → formatted for readability */}
      <div className="notif-type">{notif.notiftype.replace(/-/g, ' ')}</div>

      {/* Notification message content */}
      <div className="notif-content">{notif.notifcontent}</div>
    </div>
  );
}