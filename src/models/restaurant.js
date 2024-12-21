'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Restaurant.hasMany(models.MenuItem, { foreignKey: 'restaurant_id' });
    }
  }
  Restaurant.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    location: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Restaurant',
  });
  return Restaurant;
};