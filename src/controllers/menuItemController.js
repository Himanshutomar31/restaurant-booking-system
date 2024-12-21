const { MenuItem } = require('../models'); 

const getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.findAll();
    res.status(200).json(menuItems);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve menu items', details: err.message });
  }
};

const getMenuItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const menuItem = await MenuItem.findByPk(id);
    if (!menuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.status(200).json(menuItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve menu item', details: err.message });
  }
};

const createMenuItem = async (req, res) => {
  try {
    const { title, description, price, restaurant_id, image_url, servings_number, servings_unit } = req.body;

    const menuItem = await MenuItem.create({
      title,
      description,
      price,
      restaurant_id,
      image_url,
      servings_number,
      servings_unit,
    });

    res.status(201).json(menuItem);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create menu item', details: err.message });
  }
};

const updateMenuItem = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await MenuItem.update(req.body, { where: { id } });
    if (updated) {
      const updatedMenuItem = await MenuItem.findByPk(id);
      res.status(200).json(updatedMenuItem);
    } else {
      res.status(404).json({ error: 'Menu item not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to update menu item', details: err.message });
  }
};

const deleteMenuItem = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await MenuItem.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send(); 
    } else {
      res.status(404).json({ error: 'Menu item not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete menu item', details: err.message });
  }
};

// Export all controller methods
module.exports = {
  getAllMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
};
