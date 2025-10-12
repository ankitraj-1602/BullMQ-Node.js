const { connection } = require('./connection')
const { Worker } = require('bullmq')

const emailWorker = new Worker(
    'emailQueue',
    async (job) => {
        console.log(`sending email to ${job.data.email}`)
        await new Promise((r) => setTimeout(r, 2000))
        console.log(`email sent`)
    },
    { connection }
)

const reportWorker = new Worker(
    'reportQueue',
    async (job) => {
        console.log(`generating ${job.data.type} report ...`)
        await new Promise((r) => setTimeout(r, 2000))
        console.log(`successfully generated report`)
    },
    { connection }
)

module.exports = { emailWorker, reportWorker }