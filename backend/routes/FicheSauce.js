//Import d'Express
const express = require("express");


//Import FicheSauce controller
const ficheSauce = require("../controllers/FicheSauce")
console.log(ficheSauce)

//La fonction Router du framework d'Express
const router = express.Router();

//Les Routes
router.post('/sauces/', ficheSauce.createFicheSauce);

//L'affichage de toute les sauces
router.get('/sauces/', ficheSauce.getAllSauce);

//Affichage d'un objet selon son ID
router.get("/sauces/:id", ficheSauce.getOneSauce);

//Modification d'une sauce via son ID
router.put("/sauces/:id", ficheSauce.updateOneSauce);

//Exportation du module
module.exports = router;

