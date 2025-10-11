const {Worker} = require('bullmq')
const {connection} = require('./connection')

// will scale this worker
// will run multiple workers across server
// for local we can use multiple terminal to run worker and test
// real world will run on multiple servers
// const worker = new Worker('taskQueue', async (job)=> {
//     console.log(`worker pid ${process.pid} processing job id ${job.id}`)
//     await new Promise((r)=>setTimeout(r,2000))
//     console.log(`worker pid ${process.pid} done with the job ${job.id}`)
// },{connection})

// retry + backoff
// const worker = new Worker('taskQueue', async (job)=> {
//     if(job.attemptsMade<4){
//         console.log(`job id ${job.id} failed`)
//     }else{
//         console.log(`worker pid ${process.pid} processing job id ${job.id}`)

//     }
//     await new Promise((r)=>setTimeout(r,2000))
// },{connection})

// graceful shutdown
// const worker = new Worker('taskQueue',async (job)=>{
//     console.log(`processing job ${job.id}`)
//     await new Promise((res)=> setTimeout(res,2000))
//     console.log(`Done job ${job.id}`)
// },{connection})

// process.on('SIGINT', async ()=> {
//     console.log(`Graceful shutdown`)
//     await worker.close();
//     console.log(`worker closed cleanly`)
//     process.exit(0)
// })

// Handeling stalled job
const worker = new Worker('taskQueue',async (job)=>{
    console.log(`processing job ${job.id}`)
    await new Promise((res)=> setTimeout(res,2000))
    console.log(`Done job ${job.id}`)
},{connection,
    stalledInterval:10000,
    maxStalledCount:1,
})

// Job Event Handling
worker.on('active', (job) => console.log(`Started ${job.name}`));
worker.on('completed', (job) => console.log(`✅ ${job.name} completed`));
worker.on('stalled', (job) => console.log(`⚠️ ${job.name} stalled`));
worker.on('failed', (job, err) => console.log(`❌ ${job.name} failed: ${err.message}`));


// worker.on('completed',(job)=>console.log(`job ${job.id} completed`))
// worker.on('failed',(job,err)=>console.log(`job ${job.id} failed`,err.message))