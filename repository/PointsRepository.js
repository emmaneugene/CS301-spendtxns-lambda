require('dotenv').config()
const Sequelize = require('sequelize')
const sequelize = new Sequelize(`mysql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_CONNECTION_STRING}`);
const initModels = require('../models/init-models')
const models = initModels(sequelize)
const { Op } = require("sequelize");

const getPointsByUserCards = async ( userId ) => {

    const points = await models.users.findAll({
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

    return points
    // const res = points.map(item => {

    //     const cards = item.dataValues.cards
    //     const cardRes = cards.map(cardItem => {

    //         const transactions = cardItem.dataValues.transactions
    //         const transactionsRes = transactions.map(transactionsItem => {
                
    //             const points = transactionsItem.dataValues.points
    //             let totalPoints = 0
    //             points.forEach(pointItem => {
    //                 totalPoints += pointItem.amount
    //             })
    //             transactionsItem.points = totalPoints
    //             return (
    //                 transactionsItem
    //             )
    //         })
    //         cardItem.transactions = transactionsRes
    //         return transactionsRes
            
    //     })

    //     return cardRes
    // })
    // console.log(res[0][0]);

    // points.forEach(item => {
    //     console.log(item.dataValues.cards[0].dataValues.transactions[0].dataValues.points);
    // })
}

module.exports = {getPointsByUserCards}