'use strict';

const axios = require('axios');
require('dotenv').config();

// API key and URL
const API_KEY = process.env.API_KEY; 
const BASE_URL = 'https://api.spoonacular.com';

// Restaurant Chains (corresponding to database IDs)
const restaurantChains = [
  { id: 1, name: "Garfield's Restaurant & Pub" },
  { id: 2, name: "Kings Family Restaurant" },
  { id: 3, name: "BJ's Restaurants" },
  { id: 4, name: "Broadway Pizza Restaurant" },
  { id: 5, name: "Start Restaurant" },
  { id: 6, name: "Mike's Restaurants" },
  { id: 7, name: "White Spot Restaurants" },
  { id: 8, name: "Ram Restaurant & Brewery" },
  { id: 9, name: "Ninety Nine Restaurants" },
  { id: 10, name: "Abc Country Restaurants" },
];

// Generate a random price
function generateRandomPrice() {
  return Math.round((Math.random() * (50 - 5) + 5) * 100) / 100; // Between $5 and $50
}

// Fetch menu items for a restaurant
async function fetchMenuItems(chainName) {
  try {
    const response = await axios.get(
      `${BASE_URL}/food/menuItems/search?query=${chainName}&number=10&apiKey=${API_KEY}`
    );

    return response.data.menuItems || [];
  } catch (error) {
    console.error(`Error fetching data for ${chainName}: ${error.message}`);
    return [];
  }
}

// Seeder Function
module.exports = {
  async up(queryInterface, Sequelize) {
    let menuItems = [];

    for (const chain of restaurantChains) {
      console.log(`Fetching menu items for ${chain.name}...`);
      const items = await fetchMenuItems(chain.name);

      items.forEach(item => {
        menuItems.push({
          title: item.title || 'Unknown Item',
          description: item.description || 'No description available',
          price: item.price || generateRandomPrice(),
          restaurant_id: chain.id, // Associate with the restaurant
          image_url: item.image || 'https://via.placeholder.com/150',
          servings_number: 1,
          servings_unit: 'plate',
          createdAt: new Date(),
        });
      });
    }

    // Insert fetched menu items into the database
    if (menuItems.length > 0) {
      await queryInterface.bulkInsert('MenuItems', menuItems);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('MenuItems', null, {});
  },
};
