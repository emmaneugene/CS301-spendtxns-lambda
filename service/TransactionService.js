const {getTransactionsByUserId} = require('../repository/TransactionRepository')

const getTransactionsByUserIdService = async (userId) => {
    const unfilteredRes = await getTransactionsByUserId(userId)
    const res = unfilteredRes.map(transaction => {
        let data = transaction.dataValues
        const card = data.Card.dataValues
        const point = data.points[0].dataValues.amount
        data.card_type = card.card_type
        data.finalPoints = Number(point)
        delete data.Card
        delete data.points
        return data
    })
    return res
}

module.exports = {getTransactionsByUserIdService}