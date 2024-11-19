const router = require('express').Router();
const { BookingController } = require('../../controllers/index');
router.post('/', BookingController.createBooking);
module.exports = router;