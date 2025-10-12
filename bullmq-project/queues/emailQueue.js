const { connection } = require('../connection')
const { Queue } = require('bullmq')

const emailQueue = new Queue('emailQueue', { connection })

async function addEmailJob(email) {
    await emailQueue.add('sendEmail',
        { email },
        {
            attempts: 3,
            backoff: { type: 'exponential', delay: 2000 },
            // removeOnComplete: true
        })
    console.log(`job added for ${email}`)
}

module.exports = {addEmailJob, emailQueue};