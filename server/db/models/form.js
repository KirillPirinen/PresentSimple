'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Form extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Present}) {
      this.belongsTo(User, {foreignKey:"user_id"})
      this.hasMany(Present, {foreignKey:"form_id"})
    }
  };
  Form.init({
    phone: {
      unique:true,
      type:DataTypes.INTEGER,
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
    isActive: DataTypes.BOOLEAN,
    status: DataTypes.BOOLEAN,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Form',
  });
  return Form;
};
