const {getPointsByUserCards} = require('../repository/PointsRepository')

const getPointsByUserCardsService = async ( cardId ) => {
    const unfilteredRes = await getPointsByUserCards(cardId)
    if (unfilteredRes.length == 0) {
        return []
    }
    const user = unfilteredRes[0]
    let res = {}
    let cards = user.dataValues.cards
    // console.log(cards);
    cards.forEach(itemCard => {
        const transactionData = itemCard.dataValues.transactions
        const id = itemCard.id
        // console.log(itemCard);
        let amount = 0
        let transactionArr = []
        transactionData.forEach(transaction => {
            pointData = transaction.dataValues.points[0].dataValues
            transaction.points = pointData.amount
            transaction.discriminator = pointData.Discriminator
            transactionArr.push(transaction)
        })
        res[id] = transactionArr 
    })
    console.log(res);
    return res
}

module.exports = {getPointsByUserCardsService}