//Import d'Express
const express = require("express");


//Import FicheSauce controller
const ficheSauce = require("../controllers/FicheSauce")
console.log(ficheSauce)

//Importation du middleware multer.js 
const multer = require("../middlewares/multer")

//La fonction Router du framework d'Express
const router = express.Router();
const authentification = require('../middlewares/authentification')
const authentificationGet = require ('../middlewares/authentificationGet')
//Les Routes
router.post('/sauces/', authentification, multer, ficheSauce.createFicheSauce);

//L'affichage de toute les sauces
router.get('/sauces/', authentificationGet, ficheSauce.getAllSauce);

//Affichage d'un objet selon son ID
router.get("/sauces/:id", authentificationGet, ficheSauce.getOneSauce);

//Modification d'une sauce via son ID
router.put("/sauces/:id", authentification, ficheSauce.updateOneSauce);

//Suppression d'une sauce
router.delete("/sauces/:id", authentification, ficheSauce.deleteOneSauce);

//Exportation du module
module.exports = router;

