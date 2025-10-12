const express = require('express');
const { createBullBoard } = require('@bull-board/api');
const { BullMQAdapter } = require('@bull-board/api/bullMQAdapter');
const { ExpressAdapter } = require('@bull-board/express');

const { emailQueue } = require('./queues/emailQueue');
const { reportQueue } = require('./queues/reportQueue');

const app = express();
const port = 3000;

// ✅ Step 1: Create Express Adapter
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

// ✅ Step 2: Create Bull Board with the queues
createBullBoard({
  queues: [
    new BullMQAdapter(emailQueue),
    new BullMQAdapter(reportQueue),
  ],
  serverAdapter,
});

// ✅ Step 3: Mount Bull Board UI route
app.use('/admin/queues', serverAdapter.getRouter());

app.get('/', (req, res) => res.send('BullMQ Server Running 🚀'));

app.listen(port, () =>
  console.log(`✅ Server running on http://localhost:${port}`)
);
