const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('points', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    amount: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: false
    },
    processed_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    TransactionId: {
      type: DataTypes.STRING(767),
      allowNull: true,
      references: {
        model: 'transactions',
        key: 'id'
      }
    },
    PointsTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'points_type',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'points',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "IX_points_PointsTypeId",
        using: "BTREE",
        fields: [
          { name: "PointsTypeId" },
        ]
      },
      {
        name: "IX_points_TransactionId",
        using: "BTREE",
        fields: [
          { name: "TransactionId" },
        ]
      },
    ]
  });
};
