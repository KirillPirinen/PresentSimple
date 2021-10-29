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
    static associate({Wish, Wishlist, Form, Present, Group, UserGroup}) {
      this.hasOne(Wishlist, {foreignKey:"user_id"})
      this.hasMany(Form, {foreignKey:"user_id"})
      this.hasMany(Present, {foreignKey:"user_id"})
      this.hasMany(Wish, {foreignKey:"user_id"})
      this.belongsToMany(Group, {through:UserGroup, foreignKey:"user_id"})
    }
  };
  User.init({
    name: DataTypes.STRING,
    lname: DataTypes.STRING,
    phone: {
      unique:true,
      type:DataTypes.STRING,
      validate:{
        len: 11,
        isNumeric:true
      }
    },
    email: {
      type:DataTypes.STRING,
      validate:{
        isEmail:true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false
    },
    avatar: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
