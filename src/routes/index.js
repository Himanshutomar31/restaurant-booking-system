const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const restaurantController = require('../controllers/restaurantController');
const menuItemController = require('../controllers/menuItemController');
const operationsController = require('../controllers/operationsController'); 

router.get('/users', userController.getAllUsers);
router.get('/restaurants', restaurantController.getAllRestaurants);
router.get('/menu-items', menuItemController.getAllMenuItems);

router.get('/search', operationsController.searchRestaurantsAndDishes) 
router.get('/restaurant/:id/menu', operationsController.retrieveRestaurantMenu) 
router.post('/cart', operationsController.addItemInCart) 
router.get('/cart/:userId', operationsController.getUserCart) 
router.get('/cart/:userId/total', operationsController.getTotalBill) 

router.post('/register', operationsController.registerUser) 
router.post('/login', operationsController.loginUser) 

module.exports = router;
