const { StatusCodes } = require('http-status-codes');
const { Logger } = require('../config/index');
const AppError = require('../utils/errors/app-error');
class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    const newEntry = await this.model.create(data);
    console.log('newEntry', newEntry);
    return newEntry;
  }

  async destroy(data) {
    const airplane = await this.model.destroy({
      where: {
        id: data,
      },
    });
    if (!airplane) {
      throw new AppError('Airplane not found', StatusCodes.NOT_FOUND);
    }
    return airplane;
  }

  async get(primaryKey) {
    const airplane = await this.model.findByPk(primaryKey);
    if (!airplane) {
      throw new AppError('Not Found', StatusCodes.NOT_FOUND);
    }
    return airplane;
  }

  async getAll() {
    return await this.model.findAll();
  }

  async update(id, data) {
    if (!id) {
      throw new AppError('Id is required', StatusCodes.BAD_REQUEST);
    }
    const airplane = await this.model.update(data, {
      where: {
        id: id,
      },
    });
    if (!airplane) {
      throw new AppError('Airplane not found', StatusCodes.NOT_FOUND);
    }
    return airplane;
  }
}

module.exports = CrudRepository;
