//
const express = require("express")

//Importation du modèle de la BDD Mongo DB Atlas
const FicheSauce = require('../models/FicheSauce')

//
exports.createFicheSauce = (req, res, next) => {
    console.log("req.body provenant du fichier controllers/FicheSauce.js")
    console.log(req.body)

    console.log("req.body.ModelSauce du fichier controllers/FicheSauce.js")
    console.log(req.body.ModelSauce)

    //Ici, pas besoin d'utiliser un json.parse() pour le req.body.ModelSauce
    const sauceModelObject = req.body.ModelSauce
    console.log(sauceModelObject)
};