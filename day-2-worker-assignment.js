const { Worker } = require('bullmq');
const { connection } = require('./connection');

const worker = new Worker('reminderQueue', async (job) => {
  console.log(`\n🕐 [${new Date().toLocaleTimeString()}] Processing ${job.name} (id: ${job.id})`);

  if (job.name === 'sendReminder') {
    // simulate failure for first two attempts
    if (job.attemptsMade < 2) {
      console.log(`⚙️ Attempt ${job.attemptsMade + 1} failed for ${job.data.email}`);
      throw new Error('Simulated email send failure');
    }
    console.log(`✅ Reminder email sent to ${job.data.email}`);
  }

  if (job.name === 'followUpNotification') {
    console.log(`⏰ Executing delayed job: ${job.data.message}`);
  }

  await new Promise((res) => setTimeout(res, 1000)); // simulate delay
}, {
  connection,
  concurrency: 3, // process up to 3 jobs in parallel
});

// Event listeners
worker.on('completed', (job) => {
  console.log(`🎉 Job completed successfully → id: ${job.id}`);
});

worker.on('failed', (job, err) => {
  console.log(`❌ Job ${job.id} failed with error: ${err.message}`);
});
