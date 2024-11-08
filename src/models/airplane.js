'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Airplane extends Model {
    //  * Helper method for defining associations.
    //  * This method is not a part of Sequelize lifecycle.
    //  * The `models/index` file will call this method automatically.

    static associate(models) {
      // define association here
    }
  }
  Airplane.init(
    {
      modelNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlphanumeric: true,
        },
      },
      capacity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: { max: 1000, min: 0 },
      },
    },
    {
      sequelize,
      modelName: 'Airplane',
    }
  );
  return Airplane;
};
/**
 To create an actual table you first need to create the model and then run the migration.
 To create the model, you can use the sequelize-cli command:
  npx sequelize-cli model:generate --name Airplane --attributes modelNumber:string,capacity:integer

  After creating the model, you can run the migration using the following command:
  npx sequelize-cli db:migrate

  Also say after creating the model and running the migration you for some reason drop the DB 
  To recreate the DB you can run the following command:
  npx sequelize-cli db:create then run the migration again.
  
  
 */
