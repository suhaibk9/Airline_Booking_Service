const express = require('express');
const router = express.Router();
const bookingRoutes = require('./booking-route');
router.use('/booking', bookingRoutes);

module.exports = router;
