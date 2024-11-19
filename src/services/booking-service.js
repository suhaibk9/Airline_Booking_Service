const { BookingRepository } = require('../repositories/index');
const bookingRepo=new BookingRepository();
// const FLIGHT_SERVICE_URL='http://localhost:3000';
const { ServerConfig } = require('../config/index');
const { FLIGHT_SERVICE_URL } = ServerConfig;
const { sequelize } = require('../models');
const axios = require('axios');
const AppError = require('../utils/errors/app-error');
const createBooking = async (data) => {
  console.log('I reached Service');
  console.log('Data', data);
  //Create a Transaction
  const transaction = await sequelize.transaction();
  try {
    const flight = await axios.get(
      `${FLIGHT_SERVICE_URL}/api/v1/flights/${data.flightId}`
    );
    const flightData = flight.data.data;
    console.log('Flight Data', flightData);
    if (data.noOfSeats > flightData.totalSeats) {
      throw new AppError(
        `Only ${flightData.totalSeats} seats are available`,
        400
      );
    }
    const totalBill = data.noOfSeats * flightData.price;
    const bookingData = {
      flightId: data.flightId,
      userId: data.userId,
      totalCost: totalBill,
      noOfSeats: data.noOfSeats,
    };
    const booking = await bookingRepo.create(bookingData, transaction);
    await axios.patch( 
      `${FLIGHT_SERVICE_URL}/api/v1/flights/${data.flightId}/seats`,
      { seats: data.noOfSeats }
    );
    await transaction.commit();
    return booking;
  } catch (err) {
    console.log(err);
    await transaction.rollback();
    throw new AppError('Booking Failed', 400);
  }
};
module.exports = {
  createBooking,
};
