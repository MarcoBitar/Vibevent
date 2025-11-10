import { body, param } from 'express-validator';

export const getClubByIdValidator = [
  param('clubid')
    .isInt().withMessage('Club ID must be a valid integer')
];

export const getClubByNameValidator = [
  body('clubname')
    .isString().withMessage('Club name must be a string')
    .notEmpty().withMessage('Club name is required')
];

export const getClubByEmailValidator = [
  body('clubemail')
    .isEmail().withMessage('Club email must be a valid format')
    .notEmpty().withMessage('Club email is required')
];

export const getClubBySearchValidator = [
  body('search')
    .isString().withMessage('Search query must be a string')
    .notEmpty().withMessage('Search query is required')
];

export const createClubValidator = [
  body('clubname')
    .isString().withMessage('Club name must be a string')
    .notEmpty().withMessage('Club name is required'),
  body('clubemail')
    .isEmail().withMessage('Club email must be a valid format')
    .notEmpty().withMessage('Club email is required'),
  body('clubpass')
    .isString().withMessage('Password must be a string')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('clubpoints')
    .optional()
    .isInt({ min: 0 }).withMessage('Club points must be a non-negative integer')
];

export const updateClubValidator = [
  param('clubid')
    .isInt().withMessage('Club ID must be a valid integer'),
  body('clubname')
    .optional()
    .isString().withMessage('Club name must be a string'),
  body('clubemail')
    .optional()
    .isEmail().withMessage('Club email must be a valid format'),
  body('clubpoints')
    .optional()
    .isInt({ min: 0 }).withMessage('Club points must be a non-negative integer')
];

export const updateClubPointsValidator = [
  param('clubid')
    .isInt().withMessage('Club ID must be a valid integer'),
  body('delta')
    .isInt().withMessage('Delta must be a valid integer')
];

export const deleteClubValidator = [
  param('clubid')
    .isInt().withMessage('Club ID must be a valid integer')
];

export const getTopClubsValidator = [
  body('limit')
    .isInt({ min: 1 }).withMessage('Limit must be a positive integer')
];

export const getRankValidator = [
  param('clubid')
    .isInt().withMessage('Club ID must be a valid integer')
];

export const existsClubByNameValidator = [
  body('clubname')
    .isString().withMessage('Club name must be a string')
    .notEmpty().withMessage('Club name is required')
];

export const existsClubByEmailValidator = [
  body('clubemail')
    .isEmail().withMessage('Club email must be a valid format')
    .notEmpty().withMessage('Club email is required')
];

export const authenticateClubValidator = [
  body('clubemail')
    .isEmail().withMessage('Club email must be a valid format')
    .notEmpty().withMessage('Club email is required'),
  body('clubpass')
    .isString().withMessage('Password must be a string')
    .notEmpty().withMessage('Password is required')
];

export const awardPointsForEventValidator = [
  param('eventid')
    .isInt().withMessage('Event ID must be a valid integer')
];