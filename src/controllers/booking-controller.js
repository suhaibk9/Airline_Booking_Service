const { StatusCodes } = require('http-status-codes');
const { BookingService } = require('../services');
const { ErrorResponse } = require('../utils/common');
const { SuccessResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');
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
async function makePayment(req, res) {
  const data = req.body;
  try {
    const booking = await BookingService.makePayment({
      bookingId: data.bookingId,
      userId: data.userId,
      totalCost: data.totalCost,
    });
    
    SuccessResponse.data = booking;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (err) {
    console.log('ERROR IN CONTROLLER', err);
    ErrorResponse.error.message = err.message;
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
}
module.exports = {
  createBooking,
  makePayment,
};
