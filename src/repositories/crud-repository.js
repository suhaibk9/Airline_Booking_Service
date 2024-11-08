const { Logger } = require('../config/logger-config');

class CrudRepository {
  constructor(model) {
    this.model = model;
  }
  //Insert INTO table (column1, column2, column3) VALUES (data.column1, data.column2, data.column3)
  async create(data) {
    const response = await this.model.create(data);
    return response;
  }
  //DELETE FROM table WHERE id = data
  async destroy(data) {
    try {
      const response = await this.model.destroy({
        where: {
          id: data,
        },
      });
      return response;
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
  //Select * from table where id = data
  async get(data) {
    try {
      const response = await this.model.findByPk(data);
      return response;
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
  //Select * from table
  async getAll() {
    try {
      const response = await this.model.findAll();
      return response;
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
  //UPDATE table SET column1 = data.column1, column2 = data.column2, column3 = data.column3 WHERE id = data.id
  async update(id, data) {
    try {
      const response = await this.model.update(data, {
        where: {
          id: id,
        },
      });
      return response;
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
}
module.exports = CrudRepository;
