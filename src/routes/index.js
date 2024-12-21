const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const restaurantController = require('../controllers/restaurantController');
const menuItemController = require('../controllers/menuItemController');

router.get('/users', userController.getAllUsers);
router.get('/restaurants', restaurantController.getAllRestaurants);
router.get('/menu-items', menuItemController.getAllMenuItems);

module.exports = router;
