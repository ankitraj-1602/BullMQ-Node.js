const { Queue } = require('bullmq');
const { connection } = require('./connection');

const queue = new Queue('taskQueue', { connection });

// to scale the server
// (async () => {
//   for (let i = 1; i <= 20; i++) {
//     await queue.add('heavyTask', { jobId: i });
//   }
//   console.log('✅ 20 jobs added');
// })();

// retry policy + backoff
(async () => {
    await queue.add('sendEmail',{
        email:'user@example.com'
    },{
        attempts:5,
        backoff:{
            type:'exponential',
            delay:2000
        },
        removeOnComplete:true,
        removeOnFail:false
    })
})();
