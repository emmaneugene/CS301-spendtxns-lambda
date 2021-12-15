require('dotenv').config()
const Sequelize = require('sequelize');
const sequelize = new Sequelize(`mysql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_CONNECTION_STRING}`);
const Rules = require('./models/rules')(sequelize)
const Transactions = require('./models/transactions')(sequelize)
const Points = require('./models/points')(sequelize)
const { DateTime } = require("luxon");
const { v4: uuidv4 } = require('uuid');

const testConnection = () => {
    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch((err )=> {
            console.error('Unable to connect to the database:', err);
        });
}

const getMultiplier = async ( card_type ) => {
    const rules = await Rules.findAll({
        attributes: [
            'multiplier',
            'min_spend',
            'foreign_spend'
        ], 
        where: {
            card_type
        }
    })
    const res = rules.map((item, index) => {
        return {
            multiplier: item.dataValues.multiplier,
            min_spend: item.dataValues.min_spend,
        }
    })
    console.log(res);
}

const getMilesMultiplier = async ( card_type) => {
    const rules = await Rules.findAll({
        attributes: [
            'multiplier',
            'min_spend',
            'foreign_spend'
        ], 
        where: {
            card_type,
        }
    })
    const res = rules.map((item, index) => {
        return {
            multiplier: item.dataValues.multiplier,
            min_spend: item.dataValues.min_spend,
        }
    })
    return res
}



const insertTransaction = async ( transactionObj ) => {
    try {
        const transaction = await Transactions.create({
            id: transactionObj.id,
            CardId: transactionObj.card_id,
            MerchantName: transactionObj.merchant,
            transaction_date: transactionObj.transaction_date,
            currency: transactionObj.currency,
            amount: transactionObj.amount
        })
        console.log(transaction);
    } catch (e) {
        console.log(e);
    }
}

const insertPoints = async ( transactionObj, amount, discriminator ) => {
    try {
        const res = await Points.create({
            id: uuidv4(), 
            TransactionId: transactionObj.id,
            amount, 
            processed_date: DateTime.utc().toISO(), 
            Discriminator: discriminator
        })
        console.log(res);
    } catch (e) {
        console.log(e)
    }
}

module.exports = {testConnection, getMultiplier, insertTransaction, getMilesMultiplier, insertPoints}