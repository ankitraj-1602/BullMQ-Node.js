const {Queue} = require('bullmq');
const {connection} = require('./connection');

const emailQueue = new Queue('emailQueue',connection);


// added a single task
// async function addJob(){
//     const job = await emailQueue.add('sendWelcomeEmail',{
//         userId:101,
//         email:'user@gmail.com'
//     })
//     console.log(`job added to queue with id ${job.id}`)
// }

// adding multiple task in queue
async function addJobs() {
  for (let i = 1; i <= 5; i++) {
    await emailQueue.add('sendWelcomeEmail', {
      userId: i,
      email: `user${i}@example.com`,
    });
  }
}

addJobs();


// addJob()