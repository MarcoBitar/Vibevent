import { body, param } from 'express-validator';

export const getRSVPByIdValidator = [
  param('rsvpid')
    .isInt().withMessage('RSVP ID must be a valid integer')
];

export const getRSVPsByEventIdValidator = [
  param('eventid')
    .isInt().withMessage('Event ID must be a valid integer')
];

export const getRSVPsByUserIdValidator = [
  param('userid')
    .isInt().withMessage('User ID must be a valid integer')
];

export const getRSVPByEventAndUserValidator = [
  body('eventid')
    .isInt().withMessage('Event ID must be a valid integer'),
  body('userid')
    .isInt().withMessage('User ID must be a valid integer')
];

export const getRSVPsByStatusandEventIdValidator = [
  body('rsvpstatus')
    .isIn(['yes', 'maybe', 'no']).withMessage('RSVP status must be "yes", "maybe", or "no"'),
  body('eventid')
    .isInt().withMessage('Event ID must be a valid integer')
];

export const getUserByRSVPStatusandEventIdValidator = [
  body('rsvpstatus')
    .isIn(['yes', 'maybe', 'no']).withMessage('RSVP status must be "yes", "maybe", or "no"'),
  body('eventid')
    .isInt().withMessage('Event ID must be a valid integer')
];

export const createRSVPValidator = [
  body('eventid')
    .isInt().withMessage('Event ID must be a valid integer'),
  body('userid')
    .isInt().withMessage('User ID must be a valid integer'),
  body('rsvpstatus')
    .isIn(['yes', 'maybe', 'no']).withMessage('RSVP status must be "yes", "maybe", or "no"')
];

export const updateRSVPStatusValidator = [
  param('rsvpid')
    .isInt().withMessage('RSVP ID must be a valid integer'),
  body('rsvpstatus')
    .isIn(['yes', 'maybe', 'no']).withMessage('RSVP status must be "yes", "maybe", or "no"')
];

export const deleteRSVPValidator = [
  param('rsvpid')
    .isInt().withMessage('RSVP ID must be a valid integer')
];

export const deleteRSVPByEventIdValidator = [
  param('eventid')
    .isInt().withMessage('Event ID must be a valid integer')
];

export const deleteRSVPByUserIdValidator = [
  param('userid')
    .isInt().withMessage('User ID must be a valid integer')
];

export const countRSVPsByEventIdValidator = [
  param('eventid')
    .isInt().withMessage('Event ID must be a valid integer')
];

export const countRSVPsByStatusandUserIdValidator = [
  body('userid')
    .isInt().withMessage('User ID must be a valid integer'),
  body('rsvpstatus')
    .isIn(['yes', 'maybe', 'no']).withMessage('RSVP status must be "yes", "maybe", or "no"')
];

export const countRSVPsByStatusandEventIdValidator = [
  body('eventid')
    .isInt().withMessage('Event ID must be a valid integer'),
  body('rsvpstatus')
    .isIn(['yes', 'maybe', 'no']).withMessage('RSVP status must be "yes", "maybe", or "no"')
];

export const existsRSVPByEventandUserIdValidator = [
  body('eventid')
    .isInt().withMessage('Event ID must be a valid integer'),
  body('userid')
    .isInt().withMessage('User ID must be a valid integer')
];