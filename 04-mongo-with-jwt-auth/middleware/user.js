
const {sercet} = require('../config')

const jwt = require('jsonwebtoken')


function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected

    let token = req.headers.authorization
    let word = token.split(" ")
    let jwtToken = word[1]

    let decodedValue = jwt.verify(jwtToken,sercet)

    if(decodedValue.username){
        next()
    }else{
        res.json({msg:"you are not authorized"})
    }
}

module.exports = userMiddleware;