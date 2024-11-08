const express = require('express');

const router = express.Router();

router.use('/airplane', require('./airplane-routes'));

module.exports = router;
