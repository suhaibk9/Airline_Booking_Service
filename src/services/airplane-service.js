const { Logger } = require('../config');
const { AirplaneRepository } = require('../repositories/index');
const { Airplane } = require('../models');
const AppError = require('../error/app-error');
const { StatusCodes } = require('http-status-codes');
const airplaneRepository = new AirplaneRepository(Airplane);

async function createAirplane(data) {
  try {
    if (isNaN(data.capacity) || parseInt(data.capacity) <= 0) {
      throw new AppError(
        'Invalid capacity value. Capacity must be a positive integer.',
        StatusCodes.BAD_REQUEST
      );
    }
    const response = await airplaneRepository.create(data);
    return response;
  } catch (error) {
    Logger.error(error);
    console.log('Error', error);

    if (error.name === 'SequelizeValidationError') {
      let explanation = [];
      error.errors.forEach((err) => explanation.push(err.message));
      throw new AppError(explanation, StatusCodes.INTERNAL_SERVER_ERROR);
    } else if (error.name === 'SequelizeDatabaseError') {
      throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
    throw new AppError(
      'Error creating airplane',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function getAirplanes() {
  try {
    const response = await airplaneRepository.getAll();
    return response;
  } catch (error) {
    Logger.error(error);
    throw new AppError(
      'Error getting airplanes',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function getAirplane(id) {
  try {
    const resp = await airplaneRepository.get(id);
    return resp;
  } catch (error) {
    Logger.error(error);
    console.log('Explaining error', error.explanation);
    console.log('ERROR MESSAGE', error.message);
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(error.message, StatusCodes.NOT_FOUND);
    }
    throw new AppError(
      'Error getting airplane',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
module.exports = {
  createAirplane,
  getAirplanes,
  getAirplane,
};
