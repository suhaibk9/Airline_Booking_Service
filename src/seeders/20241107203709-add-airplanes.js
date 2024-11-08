'use strict';
// const { Op } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Airplanes',
      [
        {
          modelNumber: 'Boeing 747',
          capacity: 416,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          modelNumber: 'Boeing 777',
          capacity: 396,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          modelNumber: 'Airbus A380',
          capacity: 853,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          modelNumber: 'Boeing 737',
          capacity: 189,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          modelNumber: 'Airbus A320',
          capacity: 150,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          modelNumber: 'Boeing 787',
          capacity: 335,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          modelNumber: 'Airbus A350',
          capacity: 440,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          modelNumber: 'Boeing 767',
          capacity: 375,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          modelNumber: 'Boeing 757',
          capacity: 239,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          modelNumber: 'Airbus A330',
          capacity: 335,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Airplanes', {});
  },
};
/**
 To add the seed data, run the following command:
  npx sequelize-cli db:seed:all
  Whatever you write here should be same as the schema you mentioned in the migration file.

  To remove the seed data, run the following command:
  npx sequelize-cli db:seed:undo:all

if want to remove all data on undo, then you can use the following command:
await queryInterface.bulkDelete('Airplanes', {}); 

if you want to remove specific data on undo, then you can use the following command:
 await queryInterface.bulkDelete('Airplanes', {
      [Op.or]: [{ modelNumber: 'Boeing 747' },
        { modelNumber: 'Boeing 777' },
        { modelNumber: 'Airbus A380' },
        { modelNumber: 'Boeing 737' },
      ],
    });
So it will remove only the data which is mentioned in the where clause.
The command will still be npx sequelize-cli db:seed:undo:all
 */
