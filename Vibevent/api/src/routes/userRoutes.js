import express from 'express';
import { validateRequest } from '../middlewares/validateRequests.js';
import * as v from '../validators/userValidator.js';
import { UserController } from '../controllers/UserController.js';
import { UserService } from '../services/UserService.js';
import { UserRepository } from '../domain/repositories/UserRepository.js';
import { handleImageUpload } from '../middlewares/handleImageUpload.js';
import { NotificationRepository } from '../domain/repositories/NotificationRepository.js';
import { EventRepository } from '../domain/repositories/EventRepository.js';
import { AttendanceRepository } from '../domain/repositories/AttendanceRepository.js';

const router = express.Router();

const userRepo = new UserRepository();
const notifRepo = new NotificationRepository();
const eventRepo = new EventRepository();
const attendRepo = new AttendanceRepository();

const userService = new UserService(userRepo, eventRepo, attendRepo, notifRepo);
const userController = new UserController(userService);


// GET routes
router.get('/', userController.getAllUsers);
router.get('/count', userController.countUsers);
router.get('/:userid', v.getUserByIdValidator, validateRequest, userController.getUserById);
router.get('/:userid/rank', v.getRankValidator, validateRequest, userController.getRank);

// POST routes
router.post('/email', v.getUserByEmailValidator, validateRequest, userController.getUserByEmail);
router.post('/username', v.getUserByUsernameValidator, validateRequest, userController.getUserByUsername);
router.post('/search', v.getUserBySearchValidator, validateRequest, userController.getUserBySearch);
router.post('/create', handleImageUpload('userpic'), v.createUserValidator, validateRequest, userController.createUser);
router.post('/top', v.getTopUsersValidator, validateRequest, userController.getTopUsers);
router.post('/exists/username', v.existsUserByUsernameValidator, validateRequest, userController.existsUserByUsername);
router.post('/exists/email', v.existsUserByEmailValidator, validateRequest, userController.existsUserByEmail);
router.post('/identifier', v.getUserByIdentifierValidator, validateRequest, userController.getUserByIdentifier);
router.post('/auth', v.authenticateUserValidator, validateRequest, userController.authenticateUser);
router.post('/event/:eventid/award', v.awardPointsForEventAttendanceValidator, validateRequest, userController.awardPointsForEventAttendance);

// PUT routes
router.put('/:userid', handleImageUpload('userpic'), v.updateUserValidator, validateRequest, userController.updateUser);
router.put('/:userid/points', v.updateUserPointsValidator, validateRequest, userController.updateUserPoints);

// DELETE route
router.delete('/:userid', v.deleteUserValidator, validateRequest, userController.deleteUser);

export default router;