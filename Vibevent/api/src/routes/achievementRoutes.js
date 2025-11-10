import express from 'express';
import { validateRequest } from '../middlewares/validateRequests.js';
import * as v from '../validators/achievementValidator.js';
import { AchievementController } from '../controllers/AchievementController.js';
import { AchievementService } from '../services/AchievementService.js';
import { AchievementRepository } from '../domain/repositories/AchievementRepository.js';
import { NotificationRepository } from '../domain/repositories/NotificationRepository.js';
import { UserRepository } from '../domain/repositories/UserRepository.js';
import { ClubRepository } from '../domain/repositories/ClubRepository.js';

const router = express.Router();

const achievementRepo = new AchievementRepository();
const notifRepo = new NotificationRepository();
const userRepo = new UserRepository();
const clubRepo = new ClubRepository();

const achievementService = new AchievementService(achievementRepo, notifRepo, userRepo, clubRepo);
const achievementController = new AchievementController(achievementService);

// GET routes
router.get('/', achievementController.getAllAchievements);
router.get('/count', achievementController.countAchievements);
router.get('/:achid', v.getAchievementByIdValidator, validateRequest, achievementController.getAchievementById);

// POST routes
router.post('/title', v.getAchievementByTitleValidator, validateRequest, achievementController.getAchievementByTitle);
router.post('/search', v.getachievementBySearchValidator, validateRequest, achievementController.getachievementBySearch);
router.post('/points', v.getAchievementsByPointsRequiredValidator, validateRequest, achievementController.getAchievementsByPointsRequired);
router.post('/create', v.createAchievementValidator, validateRequest, achievementController.createAchievement);
router.post('/count/points', v.countAchievementsByPointsRequiredValidator, validateRequest, achievementController.countAchievementsByPointsRequired);
router.post('/exists/title', v.existsAchievementByTitleValidator, validateRequest, achievementController.existsAchievementByTitle);

// PUT routes
router.put('/:achid', v.updateAchievementValidator, validateRequest, achievementController.updateAchievement);
router.put('/:achid/points', v.updateAchievementPointsValidator, validateRequest, achievementController.updateAchievementPoints);

// DELETE route
router.delete('/:achid', v.deleteAchievementValidator, validateRequest, achievementController.deleteAchievement);

export default router;