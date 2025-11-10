import { body, param } from 'express-validator';

export const getUserAchByIdValidator = [
  param('uaid')
    .isInt().withMessage('User achievement ID must be a valid integer')
];

export const getUserAchsByUserIdValidator = [
  param('userid')
    .isInt().withMessage('User ID must be a valid integer')
];

export const getUserAchsByAchIdValidator = [
  param('achid')
    .isInt().withMessage('Achievement ID must be a valid integer')
];

export const getUserAchByUserAndAchIdValidator = [
  body('userid')
    .isInt().withMessage('User ID must be a valid integer'),
  body('achid')
    .isInt().withMessage('Achievement ID must be a valid integer')
];

export const createUserAchValidator = [
  body('userid')
    .isInt().withMessage('User ID must be a valid integer'),
  body('achid')
    .isInt().withMessage('Achievement ID must be a valid integer')
];

export const deleteUserAchValidator = [
  param('uaid')
    .isInt().withMessage('User achievement ID must be a valid integer')
];

export const deleteUserAchsByUserIdValidator = [
  param('userid')
    .isInt().withMessage('User ID must be a valid integer')
];

export const deleteUserAchsByAchIdValidator = [
  param('achid')
    .isInt().withMessage('Achievement ID must be a valid integer')
];

export const countUserAchsByUserIdValidator = [
  param('userid')
    .isInt().withMessage('User ID must be a valid integer')
];

export const countUserAchsByAchIdValidator = [
  param('achid')
    .isInt().withMessage('Achievement ID must be a valid integer')
];

export const existsUserAchByUserAndAchIdValidator = [
  body('userid')
    .isInt().withMessage('User ID must be a valid integer'),
  body('achid')
    .isInt().withMessage('Achievement ID must be a valid integer')
];