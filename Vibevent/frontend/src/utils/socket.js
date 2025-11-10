import { io } from 'socket.io-client';

// === Initialize socket connection ===
// Uses websocket transport and includes credentials (cookies, headers) for auth
export const socket = io(import.meta.env.VITE_BACKEND_URL, {
  transports: ['websocket'],
  withCredentials: true,
});

// === On successful connection ===
socket.on('connect', () => {
  // Attempt to load user or club identity from localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  // If user or club is authenticated, join their private room
  if (user?.userid || user?.clubid) {
    const id = user.userid || user.clubid;
    console.log('📡 Joining room:', id);
    socket.emit('joinRoom', String(id)); // emit joinRoom event with ID
  }
});