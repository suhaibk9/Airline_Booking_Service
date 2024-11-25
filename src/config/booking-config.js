const amqlib = require('amqplib');
const { RABBITMQ_URL } = require('../config/server-config');
let channel, connection;
async function connectToQueue() {
  try {
    connection = await amqlib.connect(RABBITMQ_URL);
    channel = await connection.createChannel();
    await channel.assertQueue('email-queue');
  } catch (err) {
    console.log('Error in connecting to the queue', err);
  }
}
async function publishToQueue(data) {
  try {
    await channel.sendToQueue('email-queue', Buffer.from(JSON.stringify(data)));
  } catch (err) {
    console.log('Error in publishing to the queue', err);
  }
}
module.exports = {
  connectToQueue,
  publishToQueue,
};
