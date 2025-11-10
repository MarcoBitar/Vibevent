import express from 'express';
import { validateRequest } from '../middlewares/validateRequests.js';
import * as v from '../validators/notificationValidator.js';
import { NotificationController } from '../controllers/NotificationController.js';
import { NotificationService } from '../services/NotificationService.js';
import { NotificationRepository } from '../domain/repositories/NotificationRepository.js';

const router = express.Router();

const notificationRepo = new NotificationRepository();
const notificationService = new NotificationService(notificationRepo);
const notificationController = new NotificationController(notificationService);

// GET routes
router.get('/', notificationController.getAllNotifications);
router.get('/:notifid', v.getNotificationsByIdValidator, validateRequest, notificationController.getNotificationsById);
router.get('/user/:userid', v.getNotificationsByUserIdValidator, validateRequest, notificationController.getNotificationsByUserId);
router.get('/user/:userid/count', v.countNotificationsByUserIdValidator, validateRequest, notificationController.countNotificationsByUserId);
router.get('/user/:userid/exists', v.existsNotificationsByUserIdValidator, validateRequest, notificationController.existsNotificationsByUserId);

// POST routes
router.post('/create', v.createNotificationValidator, validateRequest, notificationController.createNotification);
router.post('/user/status', v.getNotificationsByStatusAndUserIdValidator, validateRequest, notificationController.getNotificationsByStatusAndUserId);
router.post('/user/type', v.getNotificationsByTypeAndUserIdValidator, validateRequest, notificationController.getNotificationsByTypeAndUserId);
router.post('/user/date/before', v.getNotificationsByBeforeDateandUserIdValidator, validateRequest, notificationController.getNotificationsByBeforeDateandUserId);
router.post('/user/date/after', v.getNotificationsByAfterDateandUserIdValidator, validateRequest, notificationController.getNotificationsByAfterDateandUserId);
router.post('/user/date/range', v.getNotificationsByDateRangeandUserIdValidator, validateRequest, notificationController.getNotificationsByDateRangeandUserId);
router.post('/user/search', v.getNotificationsBySearchValidator, validateRequest, notificationController.getNotificationsBySearch);
router.post('/user/status/count', v.countNotificationsByStatusAndUserIdValidator, validateRequest, notificationController.countNotificationsByStatusAndUserId);
router.post('/user/type/count', v.countNotificationsByTypeAndUserIdValidator, validateRequest, notificationController.countNotificationsByTypeAndUserId);
router.post('/user/date/before/count', v.countNotificationsByBeforeDateandUserIdValidator, validateRequest, notificationController.countNotificationsByBeforeDateandUserId);
router.post('/user/date/after/count', v.countNotificationsByAfterDateandUserIdValidator, validateRequest, notificationController.countNotificationsByAfterDateandUserId);
router.post('/user/date/range/count', v.countNotifcationsByDateRangeAndUserIdValidator, validateRequest, notificationController.countNotifcationsByDateRangeAndUserId);
router.post('/user/status/exists', v.existsNotificationsByStatusAndUserIdValidator, validateRequest, notificationController.existsNotificationsByStatusAndUserId);

// PUT route
router.put('/:notifid/status', v.updateNotificationStatusValidator, validateRequest, notificationController.updateNotificationStatus);

// DELETE routes
router.delete('/:notifid', v.deleteNotificationValidator, validateRequest, notificationController.deleteNotification);
router.delete('/user/:userid', v.deleteNotificationsByUserIdValidator, validateRequest, notificationController.deleteNotificationsByUserId);
router.post('/user/status/delete', v.deleteNotificationsByStatusAndUserIdValidator, validateRequest, notificationController.deleteNotificationsByStatusAndUserId);
router.post('/user/type/delete', v.deleteNotificationsByTypeAndUserIdValidator, validateRequest, notificationController.deleteNotificationsByTypeAndUserId);
router.post('/user/date/delete', v.deleteNotificationsByDateandUserIdValidator, validateRequest, notificationController.deleteNotificationsByDateandUserId);

export default router;