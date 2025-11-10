import express from 'express';
import { validateRequest } from '../middlewares/validateRequests.js';
import * as v from '../validators/clubAchValidator.js';
import { ClubAchController } from '../controllers/ClubAchController.js';
import { ClubAchService } from '../services/ClubAchService.js';
import { ClubAchRepository } from '../domain/repositories/ClubAchRepository.js';
import { NotificationRepository } from '../domain/repositories/NotificationRepository.js';
import { AchievementRepository } from '../domain/repositories/AchievementRepository.js';
const router = express.Router();

const clubAchRepo = new ClubAchRepository();
const notifRepo = new NotificationRepository();
const achRepo = new AchievementRepository();

const clubAchService = new ClubAchService(clubAchRepo, achRepo, notifRepo);
const clubAchController = new ClubAchController(clubAchService);

// GET routes
router.get('/', clubAchController.getAllClubAchs);
router.get('/count', clubAchController.countClubAchs);
router.get('/:caid', v.getClubAchByIdValidator, validateRequest, clubAchController.getClubAchById);
router.get('/club/:clubid', v.getClubAchsByClubIdValidator, validateRequest, clubAchController.getClubAchsByClubId);
router.get('/ach/:achid', v.getClubAchsByAchIdValidator, validateRequest, clubAchController.getClubAchsByAchId);
router.get('/club/:clubid/count', v.countClubAchsByClubIdValidator, validateRequest, clubAchController.countClubAchsByClubId);
router.get('/ach/:achid/count', v.countClubAchsByAchIdValidator, validateRequest, clubAchController.countClubAchsByAchId);

// POST routes
router.post('/create', v.createClubAchValidator, validateRequest, clubAchController.createClubAch);
router.post('/club-ach', v.getClubAchByClubAndAchIdValidator, validateRequest, clubAchController.getClubAchByClubAndAchId);
router.post('/club-ach/exists', v.existsClubAchByClubAndAchIdValidator, validateRequest, clubAchController.existsClubAchByClubAndAchId);

// DELETE routes
router.delete('/:caid', v.deleteClubAchValidator, validateRequest, clubAchController.deleteClubAch);
router.delete('/club/:clubid', v.deleteClubAchsByClubIdValidator, validateRequest, clubAchController.deleteClubAchsByClubId);
router.delete('/ach/:achid', v.deleteClubAchsByAchIdValidator, validateRequest, clubAchController.deleteClubAchsByAchId);

export default router;