
const sercet = require('../config')
const jwt = require('jsonwebtoken')


// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    let token = req.headers.authorization
    let word = token.split(" ")
    let jwtToken = word[1]

    let decodedValue = jwt.verify(jwtToken,sercet)
    // var decoded = jwt.verify(token, 'shhhhh');

    if(decodedValue.username){
        next()
    }else{
        res.json({msg:"you are not authorized"})
    }
}

module.exports = adminMiddleware;