const initModels = require('../models/init-models')
require('dotenv').config()
const Sequelize = require('sequelize')
const sequelize = new Sequelize(`mysql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_CONNECTION_STRING}`);
const models = initModels(sequelize)
const { Op } = require("sequelize");
const { v1: uuidv1 } = require('uuid');

const getCardsByUserId = async (userId) => {
    const res = await models.users.findAll({
        attributes: ['cards.transactions.CardId'],
        as: 'users',
        include: {
            model: models.cards,
            as: 'cards',
            include: {
                model: models.transactions,
                as: 'transactions',
                include: {
                    model: models.points,
                    as: 'points',
                    include: {
                        model: models.points_type,
                        as: 'PointsType'
                    }
                }
            },
            where: {
                '$users.id$': {[Op.eq]: userId}
            }
        }
    })
    return res
}

const addCard = async (userId, body) => {
    try {
        const res = await models.cards.create({
            id: uuidv1(),
            UserId: userId,
            card_pan: body.card_pan,
            card_type: body.card_type,
            Discriminator: body.Discriminator
        })
    } catch(e) {
        console.log(e);
        throw new Error('Could not add card')
    }
}

module.exports = {getCardsByUserId, addCard}