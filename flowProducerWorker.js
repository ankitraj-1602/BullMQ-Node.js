const { Worker } = require('bullmq');
const { connection } = require('./connection');

// Worker listens to the same queue name
const worker = new Worker(
  'flowQueue',
  async job => {
    console.log(`🧩 Processing ${job.name}:`, job.data);
    await new Promise(res => setTimeout(res, 1000)); // simulate work
    return { done: true };
  },
  { connection }
);

worker.on('completed', job => {
  console.log(`✅ Job ${job.name} completed`);
});

worker.on('failed', (job, err) => {
  console.error(`❌ Job ${job.name} failed:`, err);
});
