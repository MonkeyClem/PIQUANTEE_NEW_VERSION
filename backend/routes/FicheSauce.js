//Import d'Express
const express = require("express");


//Import FicheSauce controller
const ficheSauce = require("../controllers/FicheSauce")
console.log(ficheSauce)

//La fonction Router du framework d'Express
const router = express.Router();

//Les Routes
router.post('/sauces/', ficheSauce.createFicheSauce)
//Exportation du module

module.exports = router;

