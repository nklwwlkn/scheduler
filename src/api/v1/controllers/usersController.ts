import { Request, Response } from 'express'

import * as User from '@services/usersService'
import * as Task from '@services/tasksService'

export async function createUser(req: Request, res: Response) {
  const newUser = await User.create(req.body)

  res.send(newUser)
}

export async function getAllUserTasks(req: Request, res: Response) {
  const { userId } = req.params

  const tasks = await Task.getAllByUser(userId)

  return res.send(tasks)
}
