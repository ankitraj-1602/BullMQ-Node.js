const { Worker } = require('bullmq');
const { connection } = require('./connection');

const worker = new Worker('notificationQueue', async (job) => {
    if(job.name==='sendWelcomeEmail'){
        console.log(`Sending welcome email to ${job.data.email}`)
        await new Promise((res)=> setTimeout(res,2000))
        console.log('Email sent successfully')
    }
    if(job.name === 'sendWelcomeNotification'){
        console.log(`sending sms to ${job.data.number}`)
        await new Promise((res)=> setTimeout(res,2000))
        console.log(`sms sent successfully`)
    }
}, {connection})

worker.on('completed',(job)=>{
    console.log(`completed job with id ${job.id}`)
})

worker.on('failed',(job,err)=>{
    console.log(`failed job with id ${job.id}`,err.message)
})