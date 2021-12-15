const { getCardsByUserId, addCard } = require('../repository/CardRepository')

const getCardDetailsService = async (userId) => {
    const unfilteredRes = await getCardsByUserId(userId)
    // console.log(unfilteredRes[0].dataValues.cards[0].dataValues.transactions[0].points[0].dataValues.PointsType.dataValues.unit);
    if (unfilteredRes.length == 0) {
        return []
    }
    const user = unfilteredRes[0]
    let cards = user.dataValues.cards
    const res = cards.map(card => {
        const transactionData = card.dataValues.transactions
        let totalPoints = 0
        let Discriminator = ""
        transactionData.forEach(transaction => {
            totalPoints += Number(transaction.dataValues.points[0].dataValues.amount)
            Discriminator = transaction.dataValues.points[0].dataValues.PointsType.dataValues.unit
        })
        let cardRes = {}
        cardRes.id = card.id
        cardRes.UserId = card.UserId
        cardRes.card_type = card.card_type
        cardRes.discriminator = Discriminator
        cardRes.points = totalPoints
        return cardRes
    })
    return res
}

const addCardService = async (userId, body) => {
    try {
        await addCard(userId, body)
    } catch (e) {
        console.log(e);
        throw new Error('Could not add card')
    }
}

module.exports = { getCardDetailsService, addCardService}