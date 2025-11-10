import express from 'express';
import { validateRequest } from '../middlewares/validateRequests.js';
import * as v from '../validators/RSVPValidator.js';
import { RSVPController } from '../controllers/RSVPController.js';
import { RSVPService } from '../services/RSVPService.js';
import { RSVPRepository } from '../domain/repositories/RSVPRepository.js';
import { NotificationRepository } from '../domain/repositories/NotificationRepository.js';
import { EventRepository } from '../domain/repositories/EventRepository.js';
import { UserRepository } from '../domain/repositories/UserRepository.js';

const router = express.Router();

const rsvpRepo = new RSVPRepository();
const notifRepo = new NotificationRepository();
const eventRepo = new EventRepository();
const userRepo = new UserRepository();

const rsvpService = new RSVPService(rsvpRepo, eventRepo, userRepo, notifRepo);
const rsvpController = new RSVPController(rsvpService);

// GET routes
router.get('/', rsvpController.getAllRSVPs);
router.get('/:rsvpid', v.getRSVPByIdValidator, validateRequest, rsvpController.getRSVPById);
router.get('/event/:eventid', v.getRSVPsByEventIdValidator, validateRequest, rsvpController.getRSVPsByEventId);
router.get('/user/:userid', v.getRSVPsByUserIdValidator, validateRequest, rsvpController.getRSVPsByUserId);
router.get('/event/:eventid/count', v.countRSVPsByEventIdValidator, validateRequest, rsvpController.countRSVPsByEventId);

// POST routes
router.post('/create', v.createRSVPValidator, validateRequest, rsvpController.createRSVP);
router.post('/event-user', v.getRSVPByEventAndUserValidator, validateRequest, rsvpController.getRSVPByEventAndUser);
router.post('/event/status', v.getRSVPsByStatusandEventIdValidator, validateRequest, rsvpController.getRSVPsByStatusandEventId);
router.post('/event/status/users', v.getUserByRSVPStatusandEventIdValidator, validateRequest, rsvpController.getUserByRSVPStatusandEventId);
router.post('/event-user/exists', v.existsRSVPByEventandUserIdValidator, validateRequest, rsvpController.existsRSVPByEventandUserId);
router.post('/user/status/count', v.countRSVPsByStatusandUserIdValidator, validateRequest, rsvpController.countRSVPsByStatusandUserId);
router.post('/event/status/count', v.countRSVPsByStatusandEventIdValidator, validateRequest, rsvpController.countRSVPsByStatusandEventId);

// PUT route
router.put('/:rsvpid/status', v.updateRSVPStatusValidator, validateRequest, rsvpController.updateRSVPStatus);

// DELETE routes
router.delete('/:rsvpid', v.deleteRSVPValidator, validateRequest, rsvpController.deleteRSVP);
router.delete('/event/:eventid', v.deleteRSVPByEventIdValidator, validateRequest, rsvpController.deleteRSVPByEventId);
router.delete('/user/:userid', v.deleteRSVPByUserIdValidator, validateRequest, rsvpController.deleteRSVPByUserId);

export default router;