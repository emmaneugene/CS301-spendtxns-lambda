const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('transactions', {
    id: {
      type: DataTypes.STRING(767),
      allowNull: false,
      primaryKey: true
    },
    transaction_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    currency: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    amount: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: false
    },
    CardId: {
      type: DataTypes.STRING(767),
      allowNull: true,
      references: {
        model: 'cards',
        key: 'id'
      }
    },
    MerchantName: {
      type: DataTypes.STRING(767),
      allowNull: true,
      references: {
        model: 'merchants',
        key: 'name'
      }
    }
  }, {
    sequelize,
    tableName: 'transactions',
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
        name: "IX_transactions_CardId",
        using: "BTREE",
        fields: [
          { name: "CardId" },
        ]
      },
      {
        name: "IX_transactions_MerchantName",
        using: "BTREE",
        fields: [
          { name: "MerchantName" },
        ]
      },
    ]
  });
};
