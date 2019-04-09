'use strict';
module.exports = (sequelize, DataTypes) => {
  const payments = sequelize.define('payments', {
    type: DataTypes.STRING
  }, {});
  payments.associate = function(models) {
    // associations can be defined here

    payments.hasMany(models.orders, {
      foreignKey: 'payId',
      as: 'pay',
    });



  };
  return payments;
};