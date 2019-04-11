'use strict';
module.exports = (sequelize, DataTypes) => {
  const cartitems = sequelize.define('cartitems', {
    quantity: DataTypes.INTEGER
  }, {});
  cartitems.associate = function(models) {
    // associations can be defined here


    cartitems.belongsTo(models.carts, {
      foreignKey: 'cartId',
      onDelete: 'CASCADE',
    });

    cartitems.belongsTo(models.items, {
      foreignKey: 'itmId',
      onDelete: 'CASCADE',
    });

    cartitems.belongsTo(models.customers, {
      foreignKey: 'custid',
      onDelete: 'CASCADE',
    });




  };
  return cartitems;
};