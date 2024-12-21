const { Restaurant } = require('../models'); // Import the Restaurant model

const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll();

    return res.status(200).json({
      success: true,
      data: restaurants,
    });
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch restaurants',
    });
  }
};

module.exports = {
  getAllRestaurants,
};
