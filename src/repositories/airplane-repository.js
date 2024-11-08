const CrudRepository = require('./crud-repository');
class AirplaneRepository extends CrudRepository {
  constructor(model) {
    super(model);
  }
}

module.exports = AirplaneRepository;
