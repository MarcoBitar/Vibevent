import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/userRoutes.js';
import clubRoutes from './routes/clubRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import rsvpRoutes from './routes/RSVPRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import achievementRoutes from './routes/achievementRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import clubAchRoutes from './routes/clubachRoutes.js';
import userAchRoutes from './routes/userachRoutes.js';

import { healthCheck } from './config/db.js';

dotenv.config();

export const app = express();

// Middleware
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true , limit: '20mb' }));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));


// Health check
app.get('/health', async (req, res) => {
  try {
    res.json({ ok: await healthCheck() });
  } catch (e) {
    res.status(500).json({ ok: false });
  }
});

// Route mounting
app.use('/api/users', userRoutes);
app.use('/api/clubs', clubRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/rsvps', rsvpRoutes);
app.use('/api/attends', attendanceRoutes);
app.use('/api/achs', achievementRoutes);
app.use('/api/notifs', notificationRoutes);
app.use('/api/clubachs', clubAchRoutes);
app.use('/api/userachs', userAchRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to Vibevent API');
});