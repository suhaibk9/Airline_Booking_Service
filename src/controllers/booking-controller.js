const { StatusCodes } = require('http-status-codes');
const { BookingService } = require('../services');
const { ErrorResponse } = require('../utils/common');
const { SuccessResponse } = require('../utils/common');
const createBooking = async (req, res) => {
  try {
    const booking = await BookingService.createBooking(req.body);
    SuccessResponse.data = booking;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error.message = error.message;
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
};
module.exports = {
  createBooking,
};
