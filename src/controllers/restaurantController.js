const { Restaurant, MenuItem } = require('../models');
const { Sequelize, Op } = require('sequelize');

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

const searchRestaurants = async (req, res) => {
    const { query } = req.query;
  
    // Sanitize the query by trimming and replacing multiple spaces with a single space
    const sanitizedQuery = query.trim().replace(/\s+/g, ' ');
  
    if (!sanitizedQuery || sanitizedQuery.length === 0) {
      return res.status(400).json({ error: 'Invalid query parameter' });
    }
  
    try {
      // First, search for restaurants by name
      const restaurants = await Restaurant.findAll({
        where: {
          name: {
            [Sequelize.Op.iLike]: `%${sanitizedQuery}%`, // Case-insensitive search for restaurant name
          },
        },
      });
  
      // If no restaurants are found, return an empty result
      if (restaurants.length === 0) {
        return res.status(200).json([]);
      }
  
      // Extract restaurant IDs from the results
      const restaurantIds = restaurants.map(restaurant => restaurant.id);
  
      // Second, search for menu items by title (dishes)
      const menuItems = await MenuItem.findAll({
        where: {
          [Sequelize.Op.or]: [
            {
              title: {
                [Sequelize.Op.iLike]: `%${sanitizedQuery}%`, // Case-insensitive search for menu item dishes
              },
            },
          ],
          restaurant_id: {
            [Sequelize.Op.in]: restaurantIds, // Filter by the restaurants found in the first query
          },
        },
      });
  
      // Manually merge the results (you can customize the format if needed)
      const result = restaurants.map(restaurant => {
        return {
          ...restaurant.toJSON(),
          menuItems: menuItems.filter(item => item.restaurant_id === restaurant.id),
        };
      });
  
      res.status(200).json(result);
    } catch (error) {
      console.error(error); 
      res.status(500).json({ error: 'Failed to search restaurants and menu items', details: error.message });
    }
  };
  

  
const getRestaurantMenu = async (req, res) => {
    const { restaurantId } = req.params;
    try {
      const restaurant = await Restaurant.findByPk(restaurantId, {
        include: MenuItem
      });
      if (!restaurant) {
        return res.status(404).json({ error: 'Restaurant not found' });
      }
      res.status(200).json(restaurant.MenuItems);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch menu', details: error.message });
    }
  };

module.exports = {
  getAllRestaurants,
  searchRestaurants,
  getRestaurantMenu
};

