'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Restaurants', [
      { name: "Garfield's Restaurant & Pub", description: 'Casual dining restaurant', location: 'New York', createdAt: new Date() },
      { name: "Kings Family Restaurant", description: 'Family-style comfort food', location: 'California', createdAt: new Date() },
      { name: "BJ's Restaurants", description: 'American-style menu and brewery', location: 'Texas', createdAt: new Date() },
      { name: "Broadway Pizza Restaurant", description: 'Pizza and Italian dishes', location: 'Illinois', createdAt: new Date() },
      { name: "Start Restaurant", description: 'Quick bites and breakfast', location: 'Florida', createdAt: new Date() },
      { name: "Mike's Restaurants", description: 'Local cuisine and casual dining', location: 'Nevada', createdAt: new Date() },
      { name: "White Spot Restaurants", description: 'Canadian food chain', location: 'British Columbia', createdAt: new Date() },
      { name: "Ram Restaurant & Brewery", description: 'Brewery with pub food', location: 'Oregon', createdAt: new Date() },
      { name: "Ninety Nine Restaurants", description: 'Traditional American food', location: 'Massachusetts', createdAt: new Date() },
      { name: "Abc Country Restaurants", description: 'Homestyle cooking and country vibes', location: 'Washington', createdAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('restaurants', null, {});
  },
};
