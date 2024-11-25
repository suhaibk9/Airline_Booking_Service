const { BookingRepository } = require('../repositories/index');
const bookingRepo = new BookingRepository();
// const FLIGHT_SERVICE_URL='http://localhost:3000';
const { ServerConfig, QueueConfig } = require('../config/index');
const { FLIGHT_SERVICE_URL } = ServerConfig;
const { sequelize } = require('../models');
const axios = require('axios');
const AppError = require('../utils/errors/app-error');
const { ENUMS } = require('../utils/common/index');
const db = require('../models');
const { BOOKING_STATUS } = require('../utils/common/enums');
const { text } = require('express');
const createBooking = async (data) => {
  console.log('I reached Service');
  console.log('Data', data);
  //Create a Transaction
  const transaction = await db.sequelize.transaction();
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
async function makePayment(data) {
  console.log('data', data);
  const transaction = await db.sequelize.transaction();
  try {
    const bookingDetails = await bookingRepo.get(data.bookingId, transaction);
    const bookingTime = new Date(bookingDetails.createdAt);
    const currentTime = new Date();
    const diff = currentTime - bookingTime;
    //5mins
    if (diff > 300000) {
      await cancelBooking(data.bookingId);
      await bookingRepo.update(
        data.bookingId,
        { status: BOOKING_STATUS.CANCELLED },
        transaction
      );
      throw new AppError('Booking Expired', 400);
    }
    if (+bookingDetails.totalCost !== +data.totalCost) {
      console.log('Total Cost', bookingDetails.totalCost);
      console.log('Data Total Cost', data.totalCost);
      throw new AppError(
        'The amount of the payment does not match the booking amount',
        400
      );
    }
    if (+bookingDetails.userId !== +data.userId) {
      throw new AppError('You are not authorized to make this payment', 401);
    }
    const book = await bookingRepo.update(
      data.bookingId,
      { status: BOOKING_STATUS.CONFIRMED },
      transaction
    );
    // const currentUser = await axios.get(
    //   `${FLIGHT_SERVICE_URL}/api/v1/users/${data.userId}`
    // );
    // console.log('LoggedIn USer', currentUser);

    await QueueConfig.publishToQueue({
      subject: `Booking Confirmed for Flight `,
      text: `Your booking for flight confirmed. Your booking id is ${book.bookingId}`,
      recipientEmail: `suhaib.text@gmail.com`,
    });
    await transaction.commit();
    return book;
  } catch (err) {
    console.log('ERROR IN SERVICE', err);
    await transaction.rollback();
    if (err.message === 'Booking Expired') {
      throw new AppError('Booking Expired', 400);
    }
    throw new AppError('Payment Failed', 400);
  }
}
async function cancelBooking(bookingId) {
  const transaction = await db.sequelize.transaction();
  try {
    const bookingDetails = await bookingRepo.get(bookingId, transaction);
    if (bookingDetails.status === BOOKING_STATUS.CANCELLED) {
      await transaction.commit();
      return true;
    }
    await axios.patch(
      `${FLIGHT_SERVICE_URL}/api/v1/flights/${bookingDetails.flightId}/seats`,
      { seats: bookingDetails.noOfSeats, dec: false }
    );
  } catch (err) {
    await transaction.rollback();
    throw new AppError('Cancellation Failed', 400);
  }
}
async function cancelExpiredBookings() {
  console.log('Cancel Expired Bookings');
  try {
    //5mins ago
    const currentTime = new Date(Date.now() - 1000 * 300);
    const response = await bookingRepo.cancelExpiredBookings(currentTime);
    return response;
  } catch (err) {
    throw new AppError('Cancellation Failed', 400);
  }
}
module.exports = {
  createBooking,
  makePayment,
  cancelBooking,
  cancelExpiredBookings,
};
