
const serverless = require("serverless-http");
const express = require("express");
const app = express();
// const { insertTransaction, getMultiplier } = require('./repository/database')
const { getCardDetailsService, addCardService } = require('./service/CardService')
const { getPointsByUserCards } = require('./repository/PointsRepository')
const { getPointsByUserCardsService } = require('./service/PointsService')
const { getTransactionsByUserIdService } = require('./service/TransactionService')
const { verifyJwt } = require('./security/jwtAuthenticator')
const { sendMessage } = require('./service/sqsService')
const cors = require('cors')
const jwt_decode = require('jwt-decode')

require('dotenv').config()


app.use(express.json())

app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  headers: 'Accept,Authorization,Content-Type'
}))
app.use(verifyJwt)

app.get("/cards", async (req, res) => {
  const decoded = jwt_decode(req.headers['authorization'].split(' ')[1])
  const response = await getCardDetailsService(decoded.sub);
  res.send(response)
})

app.get("/transactions", async (req, res) => {
  const decoded = jwt_decode(req.headers['authorization'].split(' ')[1])
  const response = await getTransactionsByUserIdService(decoded.sub)
  res.send(response)
})

app.post("/submit", async (req, res) => {
  const data = await sendMessage(req.body)
  res.send(data)
})

app.post("/cards", async (req, res) => {
  const decoded = jwt_decode(req.headers['authorization'].split(' ')[1])
  const userId = decoded.sub
  try {
    addCardService(userId, req.body)
  } catch (e) {
    console.log(e);
    return res.status(404).json({ error: "hello" })
  }

  res.send(200).json({
    message: "Card added successfully"
  })
})

app.post("/user", async (req, res) => {
  
})

app.use((req, res) => {

  return res.status(404).json({
    error: "Not Found",
  });
});

app.listen(3002, () => {
  // getTransactionsByUserIdService('b044eeea-5818-461b-a005-372b0ee53647');
});




module.exports.handler = serverless(app);