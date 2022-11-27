# scheduler-srv

## Required envs:

- PORT=5001
- DATABASE_URL=postgresql://test_user:test_pass@localhost:5432/test_db?schema=public
- REDIS_HOST=localhost
- REDIS_PORT=6379

## Development:

0. Set required envs.
1. Clone the repo.
2. Run `npm install`
3. Build the service `npm run build`
4. Run the PostgreSQL & Redis using `docker-compose up`
5. Run the migrations `npx prisma migrate dev`
6. Generate new Prisma client `npx prusma generate`
7. Run the service `npm run start`

## Usage:

1. Create a user by POST to localhost:5000/api/v1/users {"name": YOUR_NAME, "email": VALID_EMAIL}
2. Take the ID of the user.
3. Now you can create a task with a user attached to it by POST to localhost:5000/api/v1/tasks for non-recurring task the payload should be at least { "name": YOUR_TASK_NAME }. For the recurring one - { "name": YOUR_TASK_NAME, "recurringInterval": "every_minute" | "every_day" | "every_week" | "every_two_weeks", userId: UUID4_OF_THE_USER_TO_ASSIGN_THE_TASK }
4. Once you created a recurring task, you have to see in the console after every your recurring interval a log of "Notify user ${id}"
