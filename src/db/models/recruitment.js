'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class recruitment extends Model {
    static associate(models) {
      models.recruitment.hasMany(models.requireTech, {foreignKey: 'r_id'});
      models.recruitment.hasMany(models.apply, {foreignKey: 'r_id'});
    }
  }
  recruitment.init(
    {
      c_id: DataTypes.INTEGER,
      desc: DataTypes.TEXT,
      position: DataTypes.STRING,
      bonus: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'recruitment',
    }
  );
  return recruitment;
};
