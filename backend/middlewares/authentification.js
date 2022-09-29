const jwt = require ('jsonwebtoken');

//exportation de la fonction du middleware
module.exports = (req, res, next) => {
    console.log('-----> Middleware Auth')
    console.log(req.headers.auhorization)
}

const token = req.headers.auhorization.split(" ")
console.log(token)