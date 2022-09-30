//
const express = require("express");
const mongoose = require("mongoose");

//Importation du modèle de la BDD Mongo DB Atlas
const ModelSauce = require('../models/FicheSauce')

//
exports.createFicheSauce = (req, res, next) => {
    console.log("req.body provenant du fichier controllers/FicheSauce.js")
    console.log(req.body)

    console.log("req.body.ModelSauce du fichier controllers/FicheSauce.js")
    console.log(req.body.ModelSauce)

    //Ici, pas besoin d'utiliser un json.parse() pour le req.body.ModelSauce
    const sauceModelObject = req.body.ModelSauce
    console.log("contenu de la const sauceModelObject du fichier controllers/FicheSauce.js")
    console.log(sauceModelObject)

    //L'instance ModelSauce
    const modelSauce = new ModelSauce({
        ...sauceModelObject
    });
    console.log("Contenu de modelSauce, ligne 21 du fichier controllers/FicheSauce.js")
    console.log(modelSauce)

    //Nous enregistrons l'objet au sein de la BDD
    modelSauce.save()
    .then(() => {
        res.status(201).json({
            message: 'Cette Sauce a bien été enregistrée dans la BDD',
            contenu: req.body
        })
    })
    .catch((error) => res.status(400).json(error))
};

exports.getAllSauce = (req, res, next) => {
    console.log("ModelSauce présent dans le module getAllSauce, ligne 28 du fichier controllers/FicheSauce.js")
    console.log(ModelSauce)
    //Affichage de toutes les sauces présentes dans la BDD
    ModelSauce
        .find()
        .then((allSauces) => res.status(200).json(allSauces))
        .catch((error) => res.status(400).json({error}))
}

exports.getOneSauce = (req, res, next) => { 
    console.log("Contenu de la requête de GetOneSauce (controllers/FicheSauce.js")
    console.log(req)
    console.log("Contenu du req.params de GetOneSauce")
    console.log(req.params)
    console.log("Contenu du req.params.id de GetOneSauce")
    console.log(req.params.id)

    ModelSauce.findOne(req.params)
        .then((foundSauce) => res.status(200).json(foundSauce))
        .catch((error) => res.status(404).json({error}))
}

exports.updateOneSauce = (req, res, next) => {
    console.log("Contenu du corps de la requête de updateOneSauce (controllers/FicheSauce.js")
    console.log(req.body)
    // console.log("Contenu du req.params de updateOneSauce")
    // console.log(req.params)
    console.log("Contenu du req.params.id de updateOneSauce")
    console.log(req.params.id)
    console.log({id : req.params.id})
    ModelSauce
        .updateOne({id: req.params.id}, {...req.body})
        .then(()=> res.status(200).json({message: "Object has been update"}))
        .catch(error => res.status(400).json({error}))
}