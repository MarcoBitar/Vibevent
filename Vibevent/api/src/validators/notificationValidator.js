import { body, param } from 'express-validator';

export const getNotificationsByIdValidator = [
  param('notifid')
    .isInt().withMessage('Notification ID must be a valid integer')
];

export const getNotificationsByUserIdValidator = [
  param('userid')
    .isInt().withMessage('User ID must be a valid integer')
];

export const getNotificationsByStatusAndUserIdValidator = [
  body('userid')
    .isInt().withMessage('User ID must be a valid integer'),
  body('notifstatus')
    .isIn(['read', 'unread']).withMessage('Notification status must be either "read" or "unread"')
];

export const getNotificationsByTypeAndUserIdValidator = [
  body('userid')
    .isInt().withMessage('User ID must be a valid integer'),
  body('notiftype')
    .isString().withMessage('Notification type must be a string')
    .notEmpty().withMessage('Notification type is required')
];

export const getNotificationsByBeforeDateandUserIdValidator = [
  body('userid')
    .isInt().withMessage('User ID must be a valid integer'),
  body('beforeDate')
    .isISO8601().withMessage('Before date must be a valid ISO 8601 date')
    .toDate()
];

export const getNotificationsByAfterDateandUserIdValidator = [
  body('userid')
    .isInt().withMessage('User ID must be a valid integer'),
  body('afterDate')
    .isISO8601().withMessage('After date must be a valid ISO 8601 date')
    .toDate()
];

export const getNotificationsByDateRangeandUserIdValidator = [
  body('userid')
    .isInt().withMessage('User ID must be a valid integer'),
  body('startDate')
    .isISO8601().withMessage('Start date must be a valid ISO 8601 date')
    .toDate(),
  body('endDate')
    .isISO8601().withMessage('End date must be a valid ISO 8601 date')
    .toDate()
];

export const getNotificationsBySearchValidator = [
  body('userid')
    .isInt().withMessage('User ID must be a valid integer'),
  body('search')
    .isString().withMessage('Search query must be a string')
    .notEmpty().withMessage('Search query is required')
];

export const createNotificationValidator = [
  body('userid')
    .isInt().withMessage('User ID must be a valid integer'),
  body('notifcontent')
    .isString().withMessage('Notification message must be a string')
    .notEmpty().withMessage('Notification message is required'),
  body('notiftype')
    .isString().withMessage('Notification type must be a string')
    .notEmpty().withMessage('Notification type is required'),
  body('notifstatus')
    .optional()
    .isIn(['read', 'unread']).withMessage('Notification status must be either "read" or "unread"')
];

export const updateNotificationStatusValidator = [
  param('notifid')
    .isInt().withMessage('Notification ID must be a valid integer'),
  body('notifstatus')
    .isIn(['read', 'unread']).withMessage('Notification status must be either "read" or "unread"')
];

export const deleteNotificationValidator = [
  param('notifid')
    .isInt().withMessage('Notification ID must be a valid integer')
];

export const deleteNotificationsByUserIdValidator = [
  param('userid')
    .isInt().withMessage('User ID must be a valid integer')
];

export const deleteNotificationsByStatusAndUserIdValidator = [
  body('userid')
    .isInt().withMessage('User ID must be a valid integer'),
  body('notifstatus')
    .isIn(['read', 'unread']).withMessage('Notification status must be either "read" or "unread"')
];

export const deleteNotificationsByTypeAndUserIdValidator = [
  body('userid')
    .isInt().withMessage('User ID must be a valid integer'),
  body('notiftype')
    .isString().withMessage('Notification type must be a string')
    .notEmpty().withMessage('Notification type is required')
];

export const deleteNotificationsByDateandUserIdValidator = [
  body('userid')
    .isInt().withMessage('User ID must be a valid integer'),
  body('beforeDate')
    .isISO8601().withMessage('Before date must be a valid ISO 8601 date')
    .toDate()
];

export const countNotificationsByUserIdValidator = [
  param('userid')
    .isInt().withMessage('User ID must be a valid integer')
];

export const countNotificationsByStatusAndUserIdValidator = [
  body('userid')
    .isInt().withMessage('User ID must be a valid integer'),
  body('notifstatus')
    .isIn(['read', 'unread']).withMessage('Notification status must be either "read" or "unread"')
];

export const countNotificationsByTypeAndUserIdValidator = [
  body('userid')
    .isInt().withMessage('User ID must be a valid integer'),
  body('notiftype')
    .isString().withMessage('Notification type must be a string')
    .notEmpty().withMessage('Notification type is required')
];

export const countNotificationsByBeforeDateandUserIdValidator = [
  body('userid')
    .isInt().withMessage('User ID must be a valid integer'),
  body('beforeDate')
    .isISO8601().withMessage('Before date must be a valid ISO 8601 date')
    .toDate()
];

export const countNotificationsByAfterDateandUserIdValidator = [
  body('userid')
    .isInt().withMessage('User ID must be a valid integer'),
  body('afterDate')
    .isISO8601().withMessage('After date must be a valid ISO 8601 date')
    .toDate()
];

export const countNotifcationsByDateRangeAndUserIdValidator = [
  body('userid')
    .isInt().withMessage('User ID must be a valid integer'),
  body('startDate')
    .isISO8601().withMessage('Start date must be a valid ISO 8601 date')
    .toDate(),
  body('endDate')
    .isISO8601().withMessage('End date must be a valid ISO 8601 date')
    .toDate()
];

export const existsNotificationsByUserIdValidator = [
  param('userid')
    .isInt().withMessage('User ID must be a valid integer')
];

export const existsNotificationsByStatusAndUserIdValidator = [
  body('userid')
    .isInt().withMessage('User ID must be a valid integer'),
  body('notifstatus')
    .isIn(['read', 'unread']).withMessage('Notification status must be either "read" or "unread"')
];