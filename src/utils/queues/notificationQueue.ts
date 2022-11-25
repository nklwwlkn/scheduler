import { Task } from '@prisma/client'
import Queue from 'bull'

import { ENV } from '@config/globals'

const notificationQueue = new Queue<Task>('task:notify', {
  redis: {
    host: ENV.REDIS_HOST,
    port: ENV.REDIS_PORT,
  },
})

notificationQueue.process(async (job) => {
  console.log(`Notify user ${job.data.userId} `)
})

export { notificationQueue }
