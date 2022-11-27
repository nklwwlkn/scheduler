import { PrismaClient, Task } from '@prisma/client'

import * as Scheduler from '@services/schedulerService'
import { connect } from '@utils/prisma/connect'

import { PrismaError, BadRequestError } from '@errors/.'

const prisma = new PrismaClient()

const INCLUDE_DEFAULT = {
  assignedTo: true,
}

export async function create(payload: Task) {
  let newTask: Task

  const { name, category, userId, startDate, endDate, recurringInterval } =
    payload

  try {
    console.log('Creating new task...')

    newTask = await prisma.task.create({
      data: {
        name: name,
        category: category,
        assignedTo: connect(userId),
        startDate: startDate,
        endDate: endDate,
        recurringInterval: recurringInterval,
      },
      include: INCLUDE_DEFAULT,
    })

    console.log(`New task with id ${newTask.id} created.`)
  } catch (err) {
    console.error(err)

    throw new PrismaError(err)
  }

  try {
    if (newTask.recurringInterval && newTask.userId) {
      const job = await Scheduler.addNotificationTask(newTask)

      newTask = await prisma.task.update({
        where: {
          id: newTask.id,
        },
        data: {
          recurringJobId: job?.id.toString(),
        },
        include: INCLUDE_DEFAULT,
      })
    }
    return newTask
  } catch (err) {
    console.error(err)

    throw new BadRequestError('Oops. Unexpected error.')
  }
}

export async function getAllByUser(userId: string) {
  const tasks = prisma.task.findMany({
    where: {
      userId: userId,
    },
  })

  return tasks
}
