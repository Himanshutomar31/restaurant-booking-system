'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MenuItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MenuItem.belongsTo(models.Restaurant, { foreignKey: 'restaurant_id' });
      MenuItem.hasMany(models.CartItem, { foreignKey: 'menu_item_id' });
      MenuItem.hasMany(models.OrderItem, { foreignKey: 'menu_item_id' });
    }
  }
  MenuItem.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.FLOAT,
    restaurant_id: DataTypes.INTEGER,
    image_url: DataTypes.STRING,
    servings_number: DataTypes.FLOAT,
    servings_unit: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MenuItem',
  });
  return MenuItem;
};