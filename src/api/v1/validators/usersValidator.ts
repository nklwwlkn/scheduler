import { body } from 'express-validator'

export const createUserValidator = [
  body('name').optional(true).trim(),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('email must be supplied.')
    .isEmail()
    .withMessage('email must have a correct email format.'),
]
