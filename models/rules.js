const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('rules', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    card_type: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    min_spend: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: false
    },
    max_spend: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: false
    },
    foreign_spend: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    multiplier: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: false
    },
    PointsTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'points_type',
        key: 'id'
      }
    },
    Discriminator: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    MerchantName: {
      type: DataTypes.STRING(767),
      allowNull: true,
      references: {
        model: 'merchants',
        key: 'name'
      }
    },
    MCC: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'rules',
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
        name: "IX_rules_MerchantName",
        using: "BTREE",
        fields: [
          { name: "MerchantName" },
        ]
      },
      {
        name: "IX_rules_PointsTypeId",
        using: "BTREE",
        fields: [
          { name: "PointsTypeId" },
        ]
      },
    ]
  });
};
