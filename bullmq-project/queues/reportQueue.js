const { connection } = require('../connection')
const { Queue } = require('bullmq')

const reportQueue = new Queue('reportQueue', { connection })

async function addReportJob(type) {
    await reportQueue.add('generateReport',
        { type },
        {
            // repeat: { cron: '*/10 * * * * *' }
            // removeOnComplete: true,
        }
    )
    console.log(`Scheduled report job added`);
}

module.exports = { reportQueue, addReportJob };