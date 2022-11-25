import { Task } from '@prisma/client'

import { notificationQueue } from '@utils/queues/notificationQueue'

const ONE_MINUTE_IN_MS = 60000
const ONE_DAY_IN_MS = ONE_MINUTE_IN_MS * 1440
const ONE_WEEK_IN_MS = ONE_DAY_IN_MS * 7
const TWO_WEEKS_IN_MS = ONE_WEEK_IN_MS * 2

enum RecurringIntervalEnum {
  every_minute = 'every_minute',
  every_day = 'every_day',
  every_week = 'every_week',
  every_two_weeks = 'every_two_weeks',
}

function parseRecurringInterval(recurringInterval: string): number | undefined {
  switch (recurringInterval) {
    case RecurringIntervalEnum['every_minute']:
      return ONE_MINUTE_IN_MS
    case RecurringIntervalEnum['every_day']:
      return ONE_DAY_IN_MS
    case RecurringIntervalEnum['every_week']:
      return ONE_WEEK_IN_MS
    case RecurringIntervalEnum['every_two_weeks']:
      return TWO_WEEKS_IN_MS
    default:
      return undefined
  }
}

export async function addNotificationTask(task: Task) {
  const everyMs = parseRecurringInterval(task.recurringInterval!)

  if (everyMs) {
    console.log(
      `Add a new notification task with id ${task.id} to queue, recurring interval is ${task.recurringInterval}`,
    )
    const job = await notificationQueue.add(task, {
      repeat: {
        every: everyMs,
        limit: 100,
      },
    })

    console.log(`New notification task added. jobId is ${job.id.toString()}`)

    return job
  }
}
