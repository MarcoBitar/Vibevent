import { useEffect, useState } from 'react';
import { socket } from '../utils/socket.js';
import SwipeToast from './SwipeToast/SwipeToast.jsx';

// NotificationHandler listens for socket notifications and queues them as swipeable toasts
export default function NotificationHandler() {
  const [toasts, setToasts] = useState([]); // active toast queue

  useEffect(() => {
    // === Handler: when socket connects, start listening for notifications
    const handleConnect = () => {
      socket.on('notification', handleNotif);
    };

    // === Handler: push incoming notification to toast queue
    const handleNotif = (notif) => {
      setToasts((prev) => [...prev, notif]);
    };

    // === Socket Lifecycle Setup ===
    if (socket.connected) {
      handleConnect(); // already connected
    } else {
      socket.once('connect', handleConnect); // wait for connection
    }

    // === Cleanup on unmount ===
    return () => {
      socket.off('connect', handleConnect);
      socket.off('notification', handleNotif);
    };
  }, []);

  // === Dismiss a toast by index ===
  const dismissToast = (index) => {
    setToasts((prev) => prev.filter((_, i) => i !== index));
  };

  // === Render active toasts ===
  return (
    <>
      {toasts.map((notif, i) => (
        <SwipeToast
          key={i}
          message={notif.notifcontent}
          onDismiss={() => dismissToast(i)}
        />
      ))}
    </>
  );
}