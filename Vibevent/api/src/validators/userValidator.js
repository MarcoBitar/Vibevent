import { body, param } from 'express-validator';

export const getUserByIdValidator = [
  param('userid')
    .isInt().withMessage('User ID must be a valid integer')
];

export const getUserByEmailValidator = [
  body('useremail')
    .isEmail().withMessage('Email must be a valid format')
    .notEmpty().withMessage('Email is required')
];

export const getUserByUsernameValidator = [
  body('username')
    .isString().withMessage('Username must be a string')
    .notEmpty().withMessage('Username is required')
];

export const getUserBySearchValidator = [
  body('search')
    .isString().withMessage('Search query must be a string')
    .notEmpty().withMessage('Search query cannot be empty')
];

export const createUserValidator = [
  body('username')
    .isString().withMessage('Username must be a string')
    .notEmpty().withMessage('Username is required'),
  body('useremail')
    .isEmail().withMessage('Email must be a valid format')
    .notEmpty().withMessage('Email is required'),
  body('userpass')
    .isString().withMessage('Password must be a string')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('userrole')
    .optional()
    .isIn(['user', 'club']).withMessage('Role must be either "user" or "club"'),
  body('userpoints')
    .optional()
    .isInt({ min: 0 }).withMessage('Points must be a non-negative integer')
];

export const updateUserValidator = [
  param('userid')
    .isInt().withMessage('User ID must be a valid integer'),
  body('username')
    .optional()
    .isString().withMessage('Username must be a string'),
  body('useremail')
    .optional()
    .isEmail().withMessage('Email must be a valid format'),
  body('userpoints')
    .optional()
    .isInt({ min: 0 }).withMessage('Points must be a non-negative integer')
];

export const updateUserPointsValidator = [
  param('userid')
    .isInt().withMessage('User ID must be a valid integer'),
  body('delta')
    .isInt().withMessage('Delta must be an integer'),
];

export const deleteUserValidator = [
  param('userid')
    .isInt().withMessage('User ID must be a valid integer')
];

export const getTopUsersValidator = [
  body('limit')
    .isInt({ min: 1 }).withMessage('Limit must be a positive integer')
];

export const getRankValidator = [
  param('userid')
    .isInt().withMessage('User ID must be a valid integer')
];

export const existsUserByUsernameValidator = [
  body('username')
    .isString().withMessage('Username must be a string')
    .notEmpty().withMessage('Username is required')
];

export const existsUserByEmailValidator = [
  body('useremail')
    .isEmail().withMessage('Email must be a valid format')
    .notEmpty().withMessage('Email is required')
];

export const getUserByIdentifierValidator = [
  body('identifier')
    .isString().withMessage('Identifier must be a string')
    .notEmpty().withMessage('Identifier is required')
];

export const authenticateUserValidator = [
  body('useremail')
    .isEmail().withMessage('Email must be a valid format')
    .notEmpty().withMessage('Email is required'),
  body('userpass')
    .isString().withMessage('Password must be a string')
    .notEmpty().withMessage('Password is required')
];

export const awardPointsForEventAttendanceValidator = [
  param('eventid')
    .isInt().withMessage('Event ID must be a valid integer')
];