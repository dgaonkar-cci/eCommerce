'use strict';
module.exports = (sequelize, DataTypes) => {
  const items = sequelize.define('items', {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    color: DataTypes.STRING,
    size: DataTypes.INTEGER
  }, {});
  items.associate = function(models) {
    // associations can be defined here

    items.belongsTo(models.subcategories, {
      foreignKey: 'subId',
      onDelete: 'CASCADE',
    });

    items.hasMany(models.inventories, {
      foreignKey: 'itemId',
      as: 'item',
    });

    items.hasMany(models.cartitems, {
      foreignKey: 'itmId',
      as: 'itm',
    });

    
    items.hasMany(models.orderitems, {
      foreignKey: 'itemsId',
      as: 'items',
    });



  };
  return items;
};