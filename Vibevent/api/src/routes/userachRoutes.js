import express from 'express';
import { validateRequest } from '../middlewares/validateRequests.js';
import * as v from '../validators/userAchValidator.js';
import { UserAchController } from '../controllers/UserAchController.js';
import { UserAchService } from '../services/UserAchService.js';
import { UserAchRepository } from '../domain/repositories/UserAchRepository.js';
import { NotificationRepository } from '../domain/repositories/NotificationRepository.js';
import { AchievementRepository } from '../domain/repositories/AchievementRepository.js';

const router = express.Router();

const userAchRepo = new UserAchRepository();
const achRepo = new AchievementRepository();
const notifRepo = new NotificationRepository();

const userAchService = new UserAchService(userAchRepo, achRepo, notifRepo);
const userAchController = new UserAchController(userAchService);

// GET routes
router.get('/', userAchController.getAllUserAchs);
router.get('/count', userAchController.countUserAchs);
router.get('/:uaid', v.getUserAchByIdValidator, validateRequest, userAchController.getUserAchById);
router.get('/user/:userid', v.getUserAchsByUserIdValidator, validateRequest, userAchController.getUserAchsByUserId);
router.get('/ach/:achid', v.getUserAchsByAchIdValidator, validateRequest, userAchController.getUserAchsByAchId);
router.get('/user/:userid/count', v.countUserAchsByUserIdValidator, validateRequest, userAchController.countUserAchsByUserId);
router.get('/ach/:achid/count', v.countUserAchsByAchIdValidator, validateRequest, userAchController.countUserAchsByAchId);

// POST routes
router.post('/create', v.createUserAchValidator, validateRequest, userAchController.createUserAch);
router.post('/user-ach', v.getUserAchByUserAndAchIdValidator, validateRequest, userAchController.getUserAchByUserAndAchId);
router.post('/user-ach/exists', v.existsUserAchByUserAndAchIdValidator, validateRequest, userAchController.existsUserAchByUserAndAchId);

// DELETE routes
router.delete('/:uaid', v.deleteUserAchValidator, validateRequest, userAchController.deleteUserAch);
router.delete('/user/:userid', v.deleteUserAchsByUserIdValidator, validateRequest, userAchController.deleteUserAchsByUserId);
router.delete('/ach/:achid', v.deleteUserAchsByAchIdValidator, validateRequest, userAchController.deleteUserAchsByAchId);

export default router;