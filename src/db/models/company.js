'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class company extends Model {
    static associate(models) {
      models.company.hasMany(models.recruitment, {foreignKey: 'c_id'});
    }
  }
  company.init(
    {
      name: DataTypes.STRING,
      reigion: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'company',
      timestamps: false,
    }
  );
  return company;
};
