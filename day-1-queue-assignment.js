const { Queue } = require('bullmq');
const { connection } = require('./connection');

const notificationQueue = new Queue('notificationQueue', connection);

async function addJobs() {
    for (let i = 1; i <= 5; i++) {
        await notificationQueue.add('sendWelcomeEmail', {
            userId: i,
            email: `user${i}@example.com`,
            number: `99887766554${i}`
        });
        await notificationQueue.add('sendWelcomeNotification', {
            userId: i,
            email: `user${i}@example.com`,
            number: `99887766554${i}`
        })
    }
}

addJobs();
