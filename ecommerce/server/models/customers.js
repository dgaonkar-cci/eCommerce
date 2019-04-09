'use strict';
module.exports = (sequelize, DataTypes) => {
  const customers = sequelize.define('customers', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    address: DataTypes.STRING
  }, {});
  customers.associate = function(models) {
    // associations can be defined here

    customers.hasMany(models.carts, {
      foreignKey: 'custId',
      as: 'cust',
    });

    
    customers.hasMany(models.orders, {
      foreignKey: 'custmId',
      as: 'custm',
    });


  };
  return customers;
};