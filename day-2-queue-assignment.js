const { Queue } = require('bullmq');
const { connection } = require('./connection');

const taskQueue = new Queue('taskQueue', { connection })

async function addJobs() {
    //retry failed task
    // await taskQueue.add('unstableTask',{attempt:1},{
    //     attempts:3,
    //     backoff:2000
    // })
    // console.log('jobs added with retry enabled')

    //schedule delayed task
    // await taskQueue.add('delayedTask',{info:'send remider mail'},{
    //     delay:5000
    // })
    // console.log('added a delayed job will run after 5 seconds')

    // job concurrency
    for (let i = 1; i <= 15; i++) {
        await taskQueue.add('jobCuncurrency', {
            userId: `${i}`,
            email: `user${1}@gmail.com`
        })
    }
}

addJobs()
