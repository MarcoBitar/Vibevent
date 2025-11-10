import { body, param } from 'express-validator';

export const getEventByIdValidator = [
  param('eventid')
    .isInt().withMessage('Event ID must be a valid integer')
];

export const getEventsByClubIdValidator = [
  param('clubid')
    .isInt().withMessage('Club ID must be a valid integer')
];

export const getEventsByLocationValidator = [
  body('eventlocation')
    .isString().withMessage('Location must be a string')
    .notEmpty().withMessage('Location is required')
];

export const getEventsByLocationSearchValidator = [
  body('eventlocation')
    .isString().withMessage('Location must be a string')
    .notEmpty().withMessage('Location is required')
];

export const getEventsBySearchValidator = [
  body('search')
    .isString().withMessage('Search query must be a string')
    .notEmpty().withMessage('Search query is required')
];

export const createEventValidator = [
  body('eventtitle')
    .isString().withMessage('Event title must be a string')
    .notEmpty().withMessage('Event title is required'),
  body('eventdescription')
    .optional()
    .isString().withMessage('Event description must be a string'),
  body('eventdate')
    .isISO8601().withMessage('Event date must be a valid ISO 8601 date')
    .toDate(),
  body('eventlocation')
    .isString().withMessage('Event location must be a string')
    .notEmpty().withMessage('Event location is required'),
  body('clubid')
    .isInt().withMessage('Club ID must be a valid integer')
];

export const updateEventValidator = [
  param('eventid')
    .isInt().withMessage('Event ID must be a valid integer'),
  body('eventtitle')
    .optional()
    .isString().withMessage('Event title must be a string'),
  body('eventdesc')
    .optional()
    .isString().withMessage('Event description must be a string'),
  body('eventdate')
    .optional()
    .isISO8601().withMessage('Event date must be a valid ISO 8601 date')
    .toDate(),
  body('eventlocation')
    .optional()
    .isString().withMessage('Event location must be a string'),
  body('clubid')
    .optional()
    .isInt().withMessage('Club ID must be a valid integer')
];

export const updateEventDateValidator = [
  param('eventid')
    .isInt().withMessage('Event ID must be a valid integer'),
  body('eventdate')
    .isISO8601().withMessage('Event date must be a valid ISO 8601 date')
    .toDate()
];

export const deleteEventValidator = [
  param('eventid')
    .isInt().withMessage('Event ID must be a valid integer')
];

export const countEventsByClubIdValidator = [
  param('clubid')
    .isInt().withMessage('Club ID must be a valid integer')
];

export const countUpcomingEventsByClubIdValidator = [
  param('clubid')
    .isInt().withMessage('Club ID must be a valid integer')
];

export const countPastEventsByClubIdValidator = [
  param('clubid')
    .isInt().withMessage('Club ID must be a valid integer')
];

export const countEventsByLocationValidator = [
  body('eventlocation')
    .isString().withMessage('Location must be a string')
    .notEmpty().withMessage('Location is required')
];

export const existsEventByTitleAndDateValidator = [
  body('eventtitle')
    .isString().withMessage('Event title must be a string')
    .notEmpty().withMessage('Event title is required'),
  body('eventdate')
    .isISO8601().withMessage('Event date must be a valid ISO 8601 date')
    .toDate()
];