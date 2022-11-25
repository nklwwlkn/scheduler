import express, { Router } from 'express'

import { createUser, getAllUserTasks } from '@controllers/usersController'
import { createUserValidator } from '@validators/usersValidator'
import { validateRequest } from '@middlewares/requestValidator'

const usersRouter: Router = express.Router()

// I don't want to implement auth flow, but for user creation we still need to have some kind of an API:
usersRouter.post('/', createUserValidator, validateRequest, createUser)
usersRouter.get('/:userId/tasks', getAllUserTasks)

export { usersRouter }
