const { Restaurant, MenuItem, CartItem, User, Order, OrderItem } = require('../models');
const { Sequelize, Op } = require('sequelize');

// Search restaurants and dishes
const searchRestaurantsAndDishes = async (req, res) => {
  const { query } = req.query;
  try {
    const restaurants = await Restaurant.findAll({
      where: { name: { [Op.iLike]: `%${query}%` } },
      include: [{ model: MenuItem }],
    });

    const menuItems = await MenuItem.findAll({
      where: { title: { [Op.iLike]: `%${query}%` } },
      include: [{ model: Restaurant }],
    });

    res.json({ restaurants, menuItems });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Retrieve a restaurant's menu
const retrieveRestaurantMenu = async (req, res) => {
  const { id } = req.params;
  try {
    const menu = await MenuItem.findAll({
      where: { restaurant_id: id },
    });
    res.json(menu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add items to the cart
const addItemInCart = async (req, res) => {
  const { user_id, menu_item_id, quantity } = req.body;
  try {
    const cartItem = await CartItem.create({
      user_id,
      menu_item_id,
      quantity,
    });
    res.json(cartItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get user's cart
const getUserCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await CartItem.findAll({
      where: { user_id: userId },
      include: [{ model: MenuItem }],
    });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Calculate total bill including taxes
const getTotalBill = async (req, res) => {
  const { userId } = req.params;
  const TAX_RATE = 0.1; // 10% tax
  try {
    const cart = await CartItem.findAll({
      where: { user_id: userId },
      include: [{ model: MenuItem }],
    });

    let total = 0;
    cart.forEach(item => {
      total += item.quantity * item.MenuItem.price;
    });
    const tax = total * TAX_RATE;
    const finalTotal = total + tax;

    res.json({ total, tax, finalTotal });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Register User
const registerUser = async (req, res) => {
const { username, email, session_id, password } = req.body;
try {
    const user = await User.create({ username, email, password, session_id, created_at: new Date() });
    res.json(user);
} catch (err) {
    res.status(500).json({ error: err.message });
}
};
  
// Login User
const loginUser = async (req, res) => {
const { email } = req.body;
try {
    const user = await User.findOne({ where: { email } });
    if (user) {
    res.json(user);
    } else {
    res.status(404).json({ error: 'User not found' });
    }
} catch (err) {
    res.status(500).json({ error: err.message });
}
};

module.exports = {
    searchRestaurantsAndDishes,
    retrieveRestaurantMenu,
    addItemInCart,
    getUserCart,
    getTotalBill,
    registerUser,
    loginUser,
  };
