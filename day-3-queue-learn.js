const { Queue, Job } = require('bullmq');
const { connection } = require('./connection');

const taskQueue = new Queue('taskQueue', { connection })

async function addJobs() {
    // for rate limiting
    // for (let i = 1; i <= 5; i++) {
    //     await taskQueue.add('jobCuncurrency', {
    //         userId: `${i}`,
    //         email: `user${1}@gmail.com`
    //     })
    // }

    //cron jobs
    // await taskQueue.add('cleanupJob',{
    //     action:'CleanTempFiles'
    // },{
    //     repeat:{cron:'*/10 * * * * *'}
    // })

    //job priority
    //    await taskQueue.add('normalTask3',{name:'norma task 3'},{priority:3})
    //    await taskQueue.add('normalTask6',{name:'norma task 6'},{priority:6})
    //    await taskQueue.add('normalTask1',{name:'norma task 1'},{priority:1})
    //    await taskQueue.add('normalTask2',{name:'norma task 2'},{priority:2})

    // cleanup / expiration of job
    // await taskQueue.add('tempJob',{},{
    //     removeOnComplete:true,
    //     removeOnFail:true
    // })


}

addJobs()
