import { body } from 'express-validator'

export const createUserValidator = [
  body('name').optional(true).trim(),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('User email must be supplied.')
    .isEmail()
    .withMessage('User email must have a correct email format.'),
]
