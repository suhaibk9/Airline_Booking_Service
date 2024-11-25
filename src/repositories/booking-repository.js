const { Booking } = require('../models');
const CrudRepository = require('./crud-repository');
const AppError = require('../utils/errors/app-error');
const { BOOKING_STATUS } = require('../utils/common/enums');
const { CANCELLED, CONFIRMED } = BOOKING_STATUS;
class BookingRepository extends CrudRepository {
  constructor() {
    super(Booking);
  }
  async create(data, transaction) {
    const response = await Booking.create(data, { transaction: transaction });
    return response;
  }
  async get(data, transaction) {
    const response = await Booking.findByPk(data, { transaction: transaction });
    if (!response) {
      throw new AppError('Booking not found', 404);
    }
    return response;
  }
  async update(id, data, transaction) {
    const response = await Booking.update(
      data,
      {
        where: {
          id: id,
        },
      },
      { transaction: transaction }
    );
    return response;
  }
  async cancelExpiredBookings(timeStamp) {
    const response = await Booking.update(
      { status: CANCELLED },
      {
        where: {
          [Op.and]: [
            { createdAt: { [Op.lt]: timeStamp } },
            { status: { [Op.ne]: CONFIRMED } },
          ],
        },
      }
    );
    return response;
  }
}
module.exports = BookingRepository;
