import { body } from 'express-validator'

export const createTaskValidator = [
  body('name').trim().notEmpty().withMessage('Task name must be supplied.'),
  body('category')
    .trim()
    .optional(true)
    .toLowerCase()
    .isIn(['social', 'governance', 'environment'])
    .withMessage('category must be a known enum'),
  body('userId')
    .trim()
    .optional(true)
    .isUUID('4')
    .withMessage('UserID must be a valid UUID4.'),
  body('startDate')
    .optional(true)
    .trim()
    .isDate()
    .withMessage('startDate must be a valid Date.'),
  body('endDate')
    .optional(true)
    .trim()
    .isDate()
    .withMessage('endDate must be a valid Date.'),
  body('recurringInterval')
    .optional(true)
    .trim()
    .isIn(['every_minute', 'every_day', 'every_week', 'every_two_weeks'])
    .withMessage('recurringInterval must be a known enum'),
]
