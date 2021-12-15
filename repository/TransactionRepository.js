require('dotenv').config()
const Sequelize = require('sequelize');
const sequelize = new Sequelize(`mysql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_CONNECTION_STRING}`);
const initModels = require('../models/init-models')
const models = initModels(sequelize)
const { Op } = require("sequelize");

const getTransactionsByUserId = async (userId) => {
    const res = await models.transactions.findAll({
        as: "transactions",
        order: [
            ['transaction_date', 'DESC'],
        ],
        include: [
            {
                model: models.cards,
                as: 'Card',
                where: {
                    '$Card.UserId$': {[Op.eq]: userId}
                    },
            },
            {
                model: models.points,
                as: 'points',
                include: {
                    model: models.points_type,
                    as: "PointsType"
                }
            }
        ]
    })
    return res
}

module.exports = { getTransactionsByUserId }