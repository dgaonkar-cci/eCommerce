'use strict';
module.exports = (sequelize, DataTypes) => {
  const carts = sequelize.define('carts', {
  
  }, {});
  carts.associate = function(models) {
    // associations can be defined here


    carts.belongsTo(models.customers, {
      foreignKey: 'custId',
      onDelete: 'CASCADE',
    });

   

    carts.hasMany(models.cartitems, {
      foreignKey: 'cartId',
      as: 'cart',
    });



  };
  return carts;
};