import { body, param } from 'express-validator';

export const getAchievementByIdValidator = [
  param('achid')
    .isInt().withMessage('Achievement ID must be a valid integer')
];

export const getAchievementByTitleValidator = [
  body('achtitle')
    .isString().withMessage('Achievement title must be a string')
    .notEmpty().withMessage('Achievement title is required')
];

export const getachievementBySearchValidator = [
  body('search')
    .isString().withMessage('Search query must be a string')
    .notEmpty().withMessage('Search query is required')
];

export const getAchievementsByPointsRequiredValidator = [
  body('achpointsreq')
    .isInt({ min: 0 }).withMessage('Points required must be a non-negative integer')
];

export const createAchievementValidator = [
  body('achtitle')
    .isString().withMessage('Achievement title must be a string')
    .notEmpty().withMessage('Achievement title is required'),
  body('achdesc')
    .optional()
    .isString().withMessage('Achievement description must be a string'),
  body('achpointsreq')
    .isInt({ min: 0 }).withMessage('Points required must be a non-negative integer')
];

export const updateAchievementValidator = [
  param('achid')
    .isInt().withMessage('Achievement ID must be a valid integer'),
  body('achtitle')
    .optional()
    .isString().withMessage('Achievement title must be a string'),
  body('achdescription')
    .optional()
    .isString().withMessage('Achievement description must be a string'),
  body('achpointsreq')
    .optional()
    .isInt({ min: 0 }).withMessage('Points must be a non-negative integer')
];

export const updateAchievementPointsValidator = [
  param('achid')
    .isInt().withMessage('Achievement ID must be a valid integer'),
  body('achpointsreq')
    .isInt({ min: 0 }).withMessage('Points must be a non-negative integer')
];

export const deleteAchievementValidator = [
  param('achid')
    .isInt().withMessage('Achievement ID must be a valid integer')
];

export const countAchievementsByPointsRequiredValidator = [
  body('achpointsreq')
    .isInt({ min: 0 }).withMessage('Points required must be a non-negative integer')
];

export const existsAchievementByTitleValidator = [
  body('achtitle')
    .isString().withMessage('Achievement title must be a string')
    .notEmpty().withMessage('Achievement title is required')
];