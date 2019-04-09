'use strict';
module.exports = (sequelize, DataTypes) => {
  const subcategories = sequelize.define('subcategories', {
    name: DataTypes.STRING
  }, {});
  subcategories.associate = function(models) {
    // associations can be defined here


    subcategories.belongsTo(models.categories, {
      foreignKey: 'catId',
      onDelete: 'CASCADE',
    });

    subcategories.hasMany(models.items, {
      foreignKey: 'subId',
      as: 'sub',
    });




  };
  return subcategories;
};