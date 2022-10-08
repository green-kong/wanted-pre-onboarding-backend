'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class requireTech extends Model {
    static associate(models) {
      models.requireTech.belongsTo(models.recruitment, {
        foreignKey: 'r_id',
        onDelete: 'cascade',
      });
      models.requireTech.belongsTo(models.techList, {
        foreignKey: 't_id',
        onDelete: 'cascade',
      });
    }
  }
  requireTech.init(
    {
      r_id: DataTypes.INTEGER,
      t_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'requireTech',
      timestamps: false,
    }
  );
  return requireTech;
};
