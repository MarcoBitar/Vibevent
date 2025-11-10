import express from 'express';
import { validateRequest } from '../middlewares/validateRequests.js';
import * as v from '../validators/attendanceValidator.js';
import { AttendanceController } from '../controllers/AttendanceController.js';
import { AttendanceService } from '../services/AttendanceService.js';
import { AttendanceRepository } from '../domain/repositories/AttendanceRepository.js';
import { EventRepository } from '../domain/repositories/EventRepository.js';
import { NotificationRepository } from '../domain//repositories/NotificationRepository.js';
import { UserRepository } from '../domain/repositories/UserRepository.js';

const router = express.Router();

const attendanceRepo = new AttendanceRepository();
const eventrepo = new EventRepository();
const notifrepo =  new NotificationRepository();
const userRepo = new UserRepository();

const attendanceService = new AttendanceService(attendanceRepo, eventrepo, notifrepo, userRepo);
const attendanceController = new AttendanceController(attendanceService);

// GET routes
router.get('/', attendanceController.getAllAttendances);
router.get('/:attendid', v.getAttendanceByIdValidator, validateRequest, attendanceController.getAttendanceById);
router.get('/event/:eventid', v.getAttendancesByEventIdValidator, validateRequest, attendanceController.getAttendancesByEventId);
router.get('/user/:userid', v.getAttendancesByUserIdValidator, validateRequest, attendanceController.getAttendancesByUserId);

// POST routes
router.post('/create', v.createAttendanceValidator, validateRequest, attendanceController.createAttendance);
router.post('/event-user', v.getAttendanceByEventAndUserValidator, validateRequest, attendanceController.getAttendanceByEventAndUser);
router.post('/event/status/users', v.getAttendeesByStatusAndEventIdValidator, validateRequest, attendanceController.getAttendeesByStatusAndEventId);
router.post('/event/status/count', v.countAttendanceByStatusandEventIdValidator, validateRequest, attendanceController.countAttendanceByStatusandEventId);
router.post('/user/status/count', v.countAttendanceByStatusandUserIdValidator, validateRequest, attendanceController.countAttendanceByStatusandUserId);
router.post('/event-user/exists', v.existsAttendanceByEventandUserIdValidator, validateRequest, attendanceController.existsAttendanceByEventandUserId);

// PUT route
router.put('/:attendid/status', v.updateAttendanceStatusValidator, validateRequest, attendanceController.updateAttendanceStatus);

// DELETE routes
router.delete('/:attendid', v.deleteAttendanceValidator, validateRequest, attendanceController.deleteAttendance);
router.delete('/event/:eventid', v.deleteAttendancesByEventIdValidator, validateRequest, attendanceController.deleteAttendancesByEventId);
router.delete('/user/:userid', v.deleteAttendancesByUserIdValidator, validateRequest, attendanceController.deleteAttendancesByUserId);

export default router;