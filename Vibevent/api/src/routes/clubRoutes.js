import express from 'express';
import { validateRequest } from '../middlewares/validateRequests.js';
import * as v from '../validators/clubValidator.js';
import { ClubController } from '../controllers/ClubController.js';
import { ClubService } from '../services/ClubService.js';
import { ClubRepository } from '../domain/repositories/ClubRepository.js';
import { handleImageUpload } from '../middlewares/handleImageUpload.js';
import { NotificationRepository } from '../domain/repositories/NotificationRepository.js';
import { EventRepository } from '../domain/repositories/EventRepository.js';
import { AttendanceRepository } from '../domain/repositories/AttendanceRepository.js';

const router = express.Router();

const clubRepo = new ClubRepository();
const notifRepo = new NotificationRepository();
const eventRepo = new EventRepository();
const attendRepo = new AttendanceRepository();

const clubService = new ClubService(clubRepo, eventRepo, attendRepo, notifRepo);
const clubController = new ClubController(clubService);

// GET routes
router.get('/', clubController.getAllClubs);
router.get('/count', clubController.countClubs);
router.get('/:clubid', v.getClubByIdValidator, validateRequest, clubController.getClubById);
router.get('/:clubid/rank', v.getRankValidator, validateRequest, clubController.getRank);

// POST routes
router.post('/name', v.getClubByNameValidator, validateRequest, clubController.getClubByName);
router.post('/email', v.getClubByEmailValidator, validateRequest, clubController.getClubByEmail);
router.post('/search', v.getClubBySearchValidator, validateRequest, clubController.getClubBySearch);
router.post('/create', handleImageUpload('clubpic'), v.createClubValidator, validateRequest, clubController.createClub);
router.post('/top', v.getTopClubsValidator, validateRequest, clubController.getTopClubs);
router.post('/exists/name', v.existsClubByNameValidator, validateRequest, clubController.existsClubByName);
router.post('/exists/email', v.existsClubByEmailValidator, validateRequest, clubController.existsClubByEmail);
router.post('/auth', v.authenticateClubValidator, validateRequest, clubController.authenticateClub);
router.post('/event/:eventid/award', v.awardPointsForEventValidator, validateRequest, clubController.awardPointsForEvent);

// PUT routes
router.put('/:clubid', handleImageUpload('clubpic'), v.updateClubValidator, validateRequest, clubController.updateClub);
router.put('/:clubid/points', v.updateClubPointsValidator, validateRequest, clubController.updateClubPoints);

// DELETE route
router.delete('/:clubid', v.deleteClubValidator, validateRequest, clubController.deleteClub);

export default router;