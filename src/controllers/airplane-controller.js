const logger = require('../config/logger-config');
const { StatusCodes } = require('http-status-codes');
const { AirplaneService } = require('../services/index');
const { ErrorResponse, SuccessResponse } = require('../utils/common/index');
//{ modelNumber: 'A320', capacity: 180 },{ modelNumber: 'A380', capacity: 500 }
const createAirplane = async (req, res) => {
  console.log('Body', req.body);
  try {
    const response = await AirplaneService.createAirplane({
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity,
    });
    SuccessResponse.data = response;
    SuccessResponse.message = 'Airplane created successfully';
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    console.log('ERROR IN CREATE AIRPLANE', error);
    logger.error(error);
    ErrorResponse.error = error;
    ErrorResponse.message = error.message;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};
const getAllAirplanes = async (req, res) => {
  try {
    const response = await AirplaneService.getAirplanes();
    SuccessResponse.data = response;
    SuccessResponse.message = 'Airplanes fetched successfully';
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    logger.error(error);
    ErrorResponse.error = error;
    ErrorResponse.message = error.message;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};
module.exports = {
  createAirplane,
  getAllAirplanes,
};

// Passport
// 07508759145
