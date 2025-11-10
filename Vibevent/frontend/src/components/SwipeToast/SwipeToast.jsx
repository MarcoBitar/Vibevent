import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import './SwipeToast.css';

// SwipeToast displays a temporary toast message with swipe-to-dismiss and auto-expire behavior
export default function SwipeToast({ message, onDismiss, duration = 8000 }) {
  const [visible, setVisible] = useState(true); // controls render state

  // === Manual Dismiss Handler ===
  const handleDismiss = () => {
    setVisible(false);           // trigger unmount
    onDismiss?.();               // notify parent if callback provided
  };

  // === Auto Dismiss After Duration ===
  useEffect(() => {
    const timer = setTimeout(() => {
      handleDismiss();
    }, duration);

    return () => clearTimeout(timer); // cleanup on unmount
  }, []);

  // === Conditional Render ===
  if (!visible) return null;

  return (
    <motion.div
      className="swipe-toast"
      drag="x"                              // enable horizontal swipe
      dragConstraints={{ left: 0, right: 0 }} // restrict drag bounds
      onDragEnd={(e, info) => {
        if (Math.abs(info.offset.x) > 100) {  // dismiss if swipe exceeds threshold
          handleDismiss();
        }
      }}
      initial={{ opacity: 0, y: 20 }}         // entry animation
      animate={{ opacity: 1, y: 0 }}          // settle into view
      exit={{ opacity: 0, y: -20 }}           // exit animation
    >
      {message}
    </motion.div>
  );
}