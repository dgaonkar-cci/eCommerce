'use strict';
module.exports = (sequelize, DataTypes) => {
  const inventories = sequelize.define('inventories', {
    quantity: DataTypes.INTEGER
  }, {});
  inventories.associate = function(models) {
    // associations can be defined here

    inventories.belongsTo(models.items, {
      foreignKey: 'itemId',
      onDelete: 'CASCADE',
    }); 


  };
  return inventories;
};