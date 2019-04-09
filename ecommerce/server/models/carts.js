'use strict';
module.exports = (sequelize, DataTypes) => {
  const carts = sequelize.define('carts', {
    quantity: DataTypes.INTEGER
  }, {});
  carts.associate = function(models) {
    // associations can be defined here


    carts.belongsTo(models.customers, {
      foreignKey: 'custId',
      onDelete: 'CASCADE',
    });

    carts.belongsTo(models.items, {
      foreignKey: 'itmId',
      onDelete: 'CASCADE',
    });


  };
  return carts;
};