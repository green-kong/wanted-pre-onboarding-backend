'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class apply extends Model {
    static associate(models) {
      models.apply.belongsTo(models.user, {
        foreignKey: 'u_id',
        onDelete: 'cascade',
      });

      models.apply.belongsTo(models.recruitment, {
        foreignKey: 'r_id',
        onDelete: 'cascade',
      });
    }
  }
  apply.init(
    {
      u_id: DataTypes.INTEGER,
      r_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'apply',
    }
  );
  return apply;
};
