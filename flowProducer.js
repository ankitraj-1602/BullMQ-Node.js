const { FlowProducer } = require('bullmq');
const { connection } = require('./connection');

const flow = new FlowProducer({ connection });

async function addJob() {
  await flow.add({
    name: 'secondTask', // 👈 Child is the root, will wait for parent
    queueName: 'flowQueue',
    data: { msg: 'Task B (child)' },
    children: [
      {
        name: 'firstTask', // 👈 Parent job
        queueName: 'flowQueue',
        data: { msg: 'Task A (parent)' },
      },
    ],
  });

  console.log('✅ Job flow added: Parent → Child');
}

addJob();
