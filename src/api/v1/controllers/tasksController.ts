import { Request, Response } from 'express'

import * as Task from '@services/tasksService'

export async function createTask(req: Request, res: Response) {
  const newTask = await Task.create(req.body)

  res.send(newTask)
}
