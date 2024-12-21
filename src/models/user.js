'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.CartItem, { foreignKey: 'user_id' });
      User.hasMany(models.Order, { foreignKey: 'user_id' });    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    session_id: DataTypes.STRING,
    created_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};

