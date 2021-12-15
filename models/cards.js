const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cards', {
    id: {
      type: DataTypes.STRING(767),
      allowNull: false,
      primaryKey: true
    },
    card_pan: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    card_type: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    UserId: {
      type: DataTypes.STRING(767),
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'cards',
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
        name: "IX_cards_UserId",
        using: "BTREE",
        fields: [
          { name: "UserId" },
        ]
      },
    ]
  });
};
