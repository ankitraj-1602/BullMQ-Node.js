const { Worker } = require('bullmq');
const { connection } = require('./connection');

// for rate limiting
// const worker = new Worker('taskQueue', async (job) => {
//   console.log(`processing job with id ${job.id}`)
//   await new Promise((res) => setTimeout(res, 1000));
// }, {
//   connection,
//   limiter:{
//     max:2,
//     duration:10000
//   }
// });

// const worker = new Worker('taskQueue', async (job) => {
//     console.log(`processing job with id ${job.id} and name ${job.name}`)
//     await new Promise((res) => setTimeout(res, 1000));
// }, {
//     connection,
// });

// Event listeners
worker.on('completed', (job) => {
    console.log(`🎉 Job completed successfully → id: ${job.id}`);
});

worker.on('failed', (job, err) => {
    console.log(`❌ Job ${job.id} failed with error: ${err.message}`);
});
