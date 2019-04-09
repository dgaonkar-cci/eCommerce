'use strict';
module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define('orders', {
    orderDate: DataTypes.DATE,
    orderNo: DataTypes.INTEGER,
    amount: DataTypes.FLOAT,
    status: DataTypes.STRING
  }, {});
  orders.associate = function(models) {
    // associations can be defined here

    orders.belongsTo(models.customers, {
      foreignKey: 'custmId',
      onDelete: 'CASCADE',
    });

    orders.belongsTo(models.payments, {
      foreignKey: 'payId',
      onDelete: 'CASCADE',
    });

    orders.hasMany(models.orderitems, {
      foreignKey: 'orderId',
      as: 'order',
    });



  };
  return orders;
};