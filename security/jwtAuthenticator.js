const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');
const jwk = require('../jwk').keys[1]
const pem = jwkToPem(jwk)
require('dotenv').config()

const verifyJwt = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    if (token === process.env.API_KEY) {
        next()
        return 
    }

    jwt.verify(token, pem, { algorithms: ['RS256'] }, function(err, decodedToken) {
        if (err) {
            return res.status(403).json({
                error: "Request is not unauthorized",
            });
        }
        next()
    });
}

module.exports = {verifyJwt}

