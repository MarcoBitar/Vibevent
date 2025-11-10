import { body, param } from 'express-validator';

export const getAttendanceByIdValidator = [
  param('attendid')
    .isInt().withMessage('Attendance ID must be a valid integer')
];

export const getAttendancesByEventIdValidator = [
  param('eventid')
    .isInt().withMessage('Event ID must be a valid integer')
];

export const getAttendancesByUserIdValidator = [
  param('userid')
    .isInt().withMessage('User ID must be a valid integer')
];

export const getAttendanceByEventAndUserValidator = [
  body('eventid')
    .isInt().withMessage('Event ID must be a valid integer'),
  body('userid')
    .isInt().withMessage('User ID must be a valid integer')
];

export const getAttendeesByStatusAndEventIdValidator = [
  body('attendstatus')
    .isIn(['yes', 'no']).withMessage('Attendance status must be either "yes" or "no"'),
  body('eventid')
    .isInt().withMessage('Event ID must be a valid integer')
];

export const createAttendanceValidator = [
  body('eventid')
    .isInt().withMessage('Event ID must be a valid integer'),
  body('userid')
    .isInt().withMessage('User ID must be a valid integer'),
  body('attendstatus')
    .isIn(['yes', 'no']).withMessage('Attendance status must be either "yes" or "no"')
];

export const updateAttendanceStatusValidator = [
  param('attendid')
    .isInt().withMessage('Attendance ID must be a valid integer'),
  body('attendstatus')
    .isIn(['yes', 'no']).withMessage('Attendance status must be either "yes" or "no"')
];

export const deleteAttendanceValidator = [
  param('attendid')
    .isInt().withMessage('Attendance ID must be a valid integer')
];

export const deleteAttendancesByEventIdValidator = [
  param('eventid')
    .isInt().withMessage('Event ID must be a valid integer')
];

export const deleteAttendancesByUserIdValidator = [
  param('userid')
    .isInt().withMessage('User ID must be a valid integer')
];

export const countAttendanceByStatusandEventIdValidator = [
  body('attendstatus')
    .isIn(['yes', 'no']).withMessage('Attendance status must be either "yes" or "no"'),
  body('eventid')
    .isInt().withMessage('Event ID must be a valid integer')
];

export const countAttendanceByStatusandUserIdValidator = [
  body('attendstatus')
    .isIn(['yes', 'no']).withMessage('Attendance status must be either "yes" or "no"'),
  body('userid')
    .isInt().withMessage('User ID must be a valid integer')
];

export const existsAttendanceByEventandUserIdValidator = [
  body('eventid')
    .isInt().withMessage('Event ID must be a valid integer'),
  body('userid')
    .isInt().withMessage('User ID must be a valid integer')
];