//Import d'Express
const express = require("express");


//Import FicheSauce controller
const ficheSauce = require("../controllers/FicheSauce")
console.log(ficheSauce)

//La fonction Router du framework d'Express
const router = express.Router();
const authentification = require('../middlewares/authentification')

//Les Routes
router.post('/sauces/', authentification, ficheSauce.createFicheSauce);

//L'affichage de toute les sauces
router.get('/sauces/', authentification, ficheSauce.getAllSauce);

//Affichage d'un objet selon son ID
router.get("/sauces/:id", authentification, ficheSauce.getOneSauce);

//Modification d'une sauce via son ID
router.put("/sauces/:id", authentification, ficheSauce.updateOneSauce);

//Suppression d'une sauce
router.delete("/sauces/:id", authentification, ficheSauce.deleteOneSauce);

//Exportation du module
module.exports = router;

