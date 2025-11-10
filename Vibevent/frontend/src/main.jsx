import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// === Mount React App ===
// Uses React 18's createRoot API for concurrent rendering
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// === Register Service Worker ===
// Enables offline caching and PWA capabilities if supported
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log("SW registered", reg))     // success log
      .catch(err => console.error("SW failed", err));     // failure log
  });
}