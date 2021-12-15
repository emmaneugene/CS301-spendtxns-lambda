const initModels = require('../models/init-models')
require('dotenv').config()
const Sequelize = require('sequelize')
const sequelize = new Sequelize(`mysql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_CONNECTION_STRING}`);
const models = initModels(sequelize)

const addUser = async (  ) 