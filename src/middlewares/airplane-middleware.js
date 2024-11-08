const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../../src/utils/common/index');
const AppError = require('../error/app-error');
function validateCreateAirplaneRequest(req, res, next) {
  if (!req.body.modelNumber) {
    ErrorResponse.message = 'Model Number is required';
    ErrorResponse.error = new AppError(
      ['Model Number is required'],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.capacity) {
    ErrorResponse.message = 'Capacity is required';
    ErrorResponse.error = new AppError(
      ['Capacity is required'],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (req.body.capacity < 0) {
    ErrorResponse.message = 'Capacity cannot be negative';
    ErrorResponse.error = new AppError(
      ['Capacity cannot be negative'],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

module.exports = validateCreateAirplaneRequest;
