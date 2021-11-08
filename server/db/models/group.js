'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Wish, User, UserGroup}) {
      this.belongsTo(Wish, {foreignKey:"wish_id", onDelete: 'cascade'})
      this.belongsToMany(User, {through:UserGroup, foreignKey:"group_id"})
    }
  };
  Group.init({
    maxusers: DataTypes.INTEGER,
    currentusers: DataTypes.INTEGER,
    telegram: DataTypes.STRING,
    wish_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};
