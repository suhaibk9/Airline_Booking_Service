'use strict';
const { Model } = require('sequelize');
// const { ENUMS } = require('../utils/common/index');
// console.log('ENUMS', ENUMS);
// PENDING: 'pending',
// CONFIRMED: 'confirmed',
// CANCELLED: 'cancelled',
// INITIATED: 'initiated',
// const { BOOKING_STATUS } = ENUMS;
const { BOOKING_STATUS } = require('../utils/common/enums');

// const BOOKING_STATUS = ENUMS.BOOKING_STATUS;
const { PENDING, CONFIRMED, CANCELLED, INITIATED } = BOOKING_STATUS;
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Booking.init(
    {
      flightId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      status: {
        type: DataTypes.ENUM,
        values: [PENDING, CONFIRMED, CANCELLED, INITIATED],
        defaultValue: INITIATED,
        allowNull: false,
      },
      totalCost: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      noOfSeats: {
        //no of seats booked by user in a booking
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Booking',
    }
  );
  return Booking;
};
/** 
 totalSeats in flight service flight table refers to total seats left in a flight
  noOfSeats in booking service booking table refers to no of seats booked by user in a booking
  capacity in flight service airplane table refers to total capacity of the airplane

  sameple booking body-
  {
  "flightId": 1,
  "userId": 1,
  "totalCost": 1000,
  "noOfSeats": 1
  
  }
*/
