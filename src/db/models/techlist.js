'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class techList extends Model {
    static associate(models) {
      models.techList.hasMany(models.requireTech, {foreignKey: 't_id'});
    }
  }
  techList.init(
    {
      tech: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'techList',
      timestamps: false,
    }
  );
  return techList;
};
