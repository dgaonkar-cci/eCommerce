'use strict';
module.exports = (sequelize, DataTypes) => {
  const orderitems = sequelize.define('orderitems', {
    quantity: DataTypes.INTEGER,
    amount: DataTypes.FLOAT,
    status: DataTypes.STRING
  }, {});
  orderitems.associate = function(models) {
    // associations can be defined here

    orderitems.belongsTo(models.orders, {
      foreignKey: 'orderId',
      onDelete: 'CASCADE',
    });

    orderitems.belongsTo(models.items, {
      foreignKey: 'itemsId',
      onDelete: 'CASCADE',
    });



  };
  return orderitems;
};