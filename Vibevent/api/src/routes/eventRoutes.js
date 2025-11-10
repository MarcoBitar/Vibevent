import express from 'express';
import { validateRequest } from '../middlewares/validateRequests.js';
import * as v from '../validators/eventValidator.js';
import { EventController } from '../controllers/EventController.js';
import { EventService } from '../services/EventService.js';
import { EventRepository } from '../domain/repositories/EventRepository.js';
import { handleImageUpload } from '../middlewares/handleImageUpload.js';
import { NotificationRepository } from '../domain/repositories/NotificationRepository.js';
import { ClubRepository } from '../domain/repositories/ClubRepository.js';
import { UserRepository } from '../domain/repositories/UserRepository.js';

const router = express.Router();

const eventRepo = new EventRepository();
const notifRepo = new NotificationRepository();
const clubRepo = new ClubRepository();
const userRepo = new UserRepository();

const eventService = new EventService(eventRepo, notifRepo, clubRepo, userRepo);
const eventController = new EventController(eventService);

// GET routes
router.get('/', eventController.getAllEvents);
router.get('/upcoming', eventController.getUpcomingEvents);
router.get('/past', eventController.getPastEvents);
router.get('/count', eventController.countEvents);
router.get('/:eventid', v.getEventByIdValidator, validateRequest, eventController.getEventById);
router.get('/club/:clubid', v.getEventsByClubIdValidator, validateRequest, eventController.getEventsByClubId);
router.get('/club/:clubid/upcoming', v.getEventsByClubIdValidator, validateRequest, eventController.getUpcomingEventsByClubId);
router.get('/club/:clubid/past', v.getEventsByClubIdValidator, validateRequest, eventController.getPastEventsByClubId);
router.get('/club/:clubid/count', v.countEventsByClubIdValidator, validateRequest, eventController.countEventsByClubId);
router.get('/club/:clubid/count/upcoming', v.countUpcomingEventsByClubIdValidator, validateRequest, eventController.countUpcomingEventsByClubId);
router.get('/club/:clubid/count/past', v.countPastEventsByClubIdValidator, validateRequest, eventController.countPastEventsByClubId);
router.get('/count/upcoming', eventController.countUpcomingEvents);
router.get('/count/past', eventController.countPastEvents);

// POST routes
router.post('/location', v.getEventsByLocationValidator, validateRequest, eventController.getEventsByLocation);
router.post('/location/search', v.getEventsByLocationSearchValidator, validateRequest, eventController.getEventsByLocationSearch);
router.post('/search', v.getEventsBySearchValidator, validateRequest, eventController.getEventsBySearch);
router.post('/create', handleImageUpload('eventpic'), v.createEventValidator, validateRequest, eventController.createEvent);
router.post('/count/location', v.countEventsByLocationValidator, validateRequest, eventController.countEventsByLocation);
router.post('/exists', v.existsEventByTitleAndDateValidator, validateRequest, eventController.existsEventByTitleAndDate);

// PUT routes
router.put('/:eventid', handleImageUpload('eventpic'), v.updateEventValidator, validateRequest, eventController.updateEvent);
router.put('/:eventid/date', v.updateEventDateValidator, validateRequest, eventController.updateEventDate);

// DELETE route
router.delete('/:eventid', v.deleteEventValidator, validateRequest, eventController.deleteEvent);

export default router;