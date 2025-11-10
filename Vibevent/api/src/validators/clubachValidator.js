import { body, param } from 'express-validator';

export const getClubAchByIdValidator = [
  param('caid')
    .isInt().withMessage('Club achievement ID must be a valid integer')
];

export const getClubAchsByClubIdValidator = [
  param('clubid')
    .isInt().withMessage('Club ID must be a valid integer')
];

export const getClubAchsByAchIdValidator = [
  param('achid')
    .isInt().withMessage('Achievement ID must be a valid integer')
];

export const getClubAchByClubAndAchIdValidator = [
  body('clubid')
    .isInt().withMessage('Club ID must be a valid integer'),
  body('achid')
    .isInt().withMessage('Achievement ID must be a valid integer')
];

export const createClubAchValidator = [
  body('clubid')
    .isInt().withMessage('Club ID must be a valid integer'),
  body('achid')
    .isInt().withMessage('Achievement ID must be a valid integer')
];

export const deleteClubAchValidator = [
  param('caid')
    .isInt().withMessage('Club achievement ID must be a valid integer')
];

export const deleteClubAchsByClubIdValidator = [
  param('clubid')
    .isInt().withMessage('Club ID must be a valid integer')
];

export const deleteClubAchsByAchIdValidator = [
  param('achid')
    .isInt().withMessage('Achievement ID must be a valid integer')
];

export const countClubAchsByClubIdValidator = [
  param('clubid')
    .isInt().withMessage('Club ID must be a valid integer')
];

export const countClubAchsByAchIdValidator = [
  param('achid')
    .isInt().withMessage('Achievement ID must be a valid integer')
];

export const existsClubAchByClubAndAchIdValidator = [
  body('clubid')
    .isInt().withMessage('Club ID must be a valid integer'),
  body('achid')
    .isInt().withMessage('Achievement ID must be a valid integer')
];