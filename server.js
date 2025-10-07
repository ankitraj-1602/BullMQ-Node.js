const express = require('express');
const { Queue } = require('bullmq');
const { createBullBoard } = require('@bull-board/api');
const { BullMQAdapter } = require('@bull-board/api/bullMQAdapter');
const { ExpressAdapter } = require('@bull-board/express');
const { connection } = require('./connection');

const app = express();

const taskQueue = new Queue('taskQueue', { connection });
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

createBullBoard({
  queues: [new BullMQAdapter(taskQueue)],
  serverAdapter,
});

app.use('/admin/queues', serverAdapter.getRouter());
app.listen(3000, () => console.log('Bull Board running on http://localhost:3000/admin/queues'));
