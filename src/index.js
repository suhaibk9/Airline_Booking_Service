const express = require('express');
const bodyParser = require('body-parser');

const { ServerConfig, QueueConfig } = require('./config');
const { connectToQueue, publishToQueue } = QueueConfig;
const CRONS = require('./utils/common/cron-jobs');

const apiRoutes = require('./routes');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

// Initialize all the CRONS
// CRONS.init();

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT,async () => {
  console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
  CRONS();
 await connectToQueue();
});
