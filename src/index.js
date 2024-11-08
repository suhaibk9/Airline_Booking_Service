const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
  console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});
