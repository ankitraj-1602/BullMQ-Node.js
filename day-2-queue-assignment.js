const { Queue } = require('bullmq');
const { connection } = require('./connection');

const reminderQueue = new Queue('reminderQueue', { connection });

async function addJobs() {
  // 5 regular reminder jobs
  for (let i = 1; i <= 5; i++) {
    await reminderQueue.add('sendReminder', {
      userId: i,
      email: `user${i}@example.com`,
    }, {
      attempts: 3,          // retry 3 times
      backoff: 2000,        // wait 2 s before retry
    });
  }

  // one delayed follow-up notification
  await reminderQueue.add('followUpNotification', {
    message: 'Send follow-up reminder to all users',
  }, {
    delay: 5000,            // execute after 5 s
  });

  console.log('✅ Jobs added successfully!');
}

addJobs();
