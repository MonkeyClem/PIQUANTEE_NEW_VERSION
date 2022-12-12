//Import de la fonction express
const express = require("express");

//La fonction Router()
const router = express.Router();

//IMPORT DE : password model
const password = require('../middlewares/password')
//Import du controller user.js 
const userController = require('../controllers/user')
console.log("CONTENU DE : userController")
console.log(userController)


//La route (endpoint) signup
router.post("/signup", password, userController.signup)

//La route login
router.post("/login" ,  userController.login)

//Exportation du module 

module.exports = router