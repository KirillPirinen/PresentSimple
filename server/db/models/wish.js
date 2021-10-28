'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wish extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Wishlist, PriceRange, WishPhoto, User, UserWish}) {
      this.belongsTo(Wishlist, {foreignKey:"wishlist_id"})
      this.belongsTo(PriceRange,{foreignKey:"pricerange_id"})
      this.hasOne(WishPhoto,{foreignKey:"wish_id"})
      this.belongsTo(User, {foreignKey:"user_id"})
    }
  };
  Wish.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    isBinded: DataTypes.BOOLEAN,
    user_id: {
      defaultValue:null,
      type: DataTypes.INTEGER
    },
    pricerange_id: DataTypes.INTEGER,
    wishlist_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Wish',
  });
  return Wish;
};
