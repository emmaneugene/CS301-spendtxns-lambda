var DataTypes = require("sequelize").DataTypes;
var ___EFMigrationsHistory = require("./__EFMigrationsHistory");
var _cards = require("./cards");
var _exclusions = require("./exclusions");
var _groups = require("./groups");
var _merchants = require("./merchants");
var _points = require("./points");
var _points_type = require("./points_type");
var _rules = require("./rules");
var _transactions = require("./transactions");
var _users = require("./users");

function initModels(sequelize) {
  var __EFMigrationsHistory = ___EFMigrationsHistory(sequelize, DataTypes);
  var cards = _cards(sequelize, DataTypes);
  var exclusions = _exclusions(sequelize, DataTypes);
  var groups = _groups(sequelize, DataTypes);
  var merchants = _merchants(sequelize, DataTypes);
  var points = _points(sequelize, DataTypes);
  var points_type = _points_type(sequelize, DataTypes);
  var rules = _rules(sequelize, DataTypes);
  var transactions = _transactions(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  transactions.belongsTo(cards, { as: "Card", foreignKey: "CardId"});
  cards.hasMany(transactions, { as: "transactions", foreignKey: "CardId"});
  rules.belongsTo(merchants, { as: "MerchantName_merchant", foreignKey: "MerchantName"});
  merchants.hasMany(rules, { as: "rules", foreignKey: "MerchantName"});
  transactions.belongsTo(merchants, { as: "MerchantName_merchant", foreignKey: "MerchantName"});
  merchants.hasMany(transactions, { as: "transactions", foreignKey: "MerchantName"});
  points.belongsTo(points_type, { as: "PointsType", foreignKey: "PointsTypeId"});
  points_type.hasMany(points, { as: "points", foreignKey: "PointsTypeId"});
  rules.belongsTo(points_type, { as: "PointsType", foreignKey: "PointsTypeId"});
  points_type.hasMany(rules, { as: "rules", foreignKey: "PointsTypeId"});
  points.belongsTo(transactions, { as: "Transaction", foreignKey: "TransactionId"});
  transactions.hasMany(points, { as: "points", foreignKey: "TransactionId"});
  cards.belongsTo(users, { as: "User", foreignKey: "UserId"});
  users.hasMany(cards, { as: "cards", foreignKey: "UserId"});

  return {
    __EFMigrationsHistory,
    cards,
    exclusions,
    groups,
    merchants,
    points,
    points_type,
    rules,
    transactions,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
