const { Worker } = require('bullmq');
const { connection } = require('./connection')

const worker = new Worker('taskQueue', async (job) => {
    // if (job.name === 'delayedTask') {
    //     console.log('📨 Processing delayed task:', job.data);
    // }
    // retry failed jobs
    // console.log(`⚙️ Processing job: ${job.name}, attempt: ${job.attemptsMade + 1}`);
    // if (job.attemptsMade < 2) {
    //     throw new Error('failed...')
    // }
    // console.log('job succeeded on retry')

    // job concurrency
    console.log(`running job with id ${job.id}`)
    await new Promise((res) => setTimeout(res, 2000))
    console.log(`done job id ${job.id}`)
}, { connection, concurrency: 3 })

worker.on('completed', (job) => console.log(`🎉 Job ${job.id} completed`));
worker.on('failed', (job, err) => console.log(`❌ Job ${job.id} failed: ${err.message}`));